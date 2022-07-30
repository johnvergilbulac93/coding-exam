<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(Request $request)
    {

        $length = $request->length;
        $dir = $request->dir;
        $searchValue = $request->search;

        $query = User::with(['roles'])->orderBy('id', $dir);

        if ($searchValue) {
            $query->where(function ($query) use ($searchValue) {
                $query->where('name', 'like', '%' . $searchValue . '%')
                    ->orWhere('email', 'like', '%' . $searchValue . '%');
            });
        }

        $finalResults = $query->paginate($length);

        return $finalResults;
    }
    public function create(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:users',],
            'email' => ['required', 'email', 'unique:users'],
            'role' => ['required'],
            'password' => ['required', 'min:8'],
            'password_confirmation' => ['required', 'min:8', 'same:password'],

        ]);

        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role
        ]);

        $user->save();

        return response()->json([
            'message' => 'User successfully created.'
        ], 201);
    }
    public function delete($id)
    {
        User::whereId($id)->delete();
        return response()->json([
            'message' => 'User successfully deleted.'
        ], 200);
    }
    public function update(Request $request)
    {
        if ($request->password) {
            $request->validate([
                'password' => ['required', 'min:8'],
                'password_confirmation' =>  ['required_with:password', 'same:password', 'min:8']
            ]);
        }
        $request->validate([
            'name' => ['required', 'string'],
            'email' => ['required', 'email'],
            'role' => ['required'],
        ]);


        User::whereId($request->id)->whereId($request->id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role
        ]);

        return response()->json([
            'message' => ['User successfully updated.']
        ], 200);
    }
}
