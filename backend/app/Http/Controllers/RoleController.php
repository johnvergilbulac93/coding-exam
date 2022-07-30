<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Requests\RoleRequest;

class RoleController extends Controller
{
    public function index(Request $request)
    {

        $length = $request->length;
        $dir = $request->dir;
        $searchValue = $request->search;

        $query = Role::orderBy('id', $dir);

        if ($searchValue) {
            $query->where(function ($query) use ($searchValue) {
                $query->where('name', 'like', '%' . $searchValue . '%')
                    ->orWhere('description', 'like', '%' . $searchValue . '%');
            });
        }

        $finalResults = $query->paginate($length);

        return $finalResults;
    }

    public function create(RoleRequest $request)
    {
        $role = new Role([
            "name" => $request->name,
            "description" => $request->description
        ]);
        $role->save();
        return response()->json([
            'message' => 'Role successfully created.'
        ], 201);
    }
    public function delete($id)
    {
        Role::whereId($id)->delete();
        return response()->json([
            'message' => 'Role successfully deleted.'
        ], 201);
    }
    public function update(RoleRequest $request)
    {
        Role::whereId($request->id)->update([
            'name' => $request->name,
            'description' => $request->description
        ]);
        return response()->json([
            'message' => 'Role successfully updated.'
        ], 200);
    }
    public function show_roles()
    {

        return Role::all();
    }
}
