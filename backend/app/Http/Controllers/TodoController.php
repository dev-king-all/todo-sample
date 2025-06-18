<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Storage;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        return Todo::create($validated);
    }

    public function show(Todo $todo)
    {
        return $todo;
    }

    public function update(Request $request, Todo $todo)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'sometimes|boolean',
        ]);

        $todo->update($validated);
        return $todo;
    }

    public function destroy(Todo $todo)
    {
        if ($todo->file_path) {
            Storage::delete($todo->file_path);
        }
        $todo->delete();
        return response()->noContent();
    }

    public function uploadFile(Request $request, Todo $todo)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:2048',
        ]);

        if ($todo->file_path) {
            Storage::delete($todo->file_path);
        }

        $path = $request->file('file')->store('/todo_files');
        $todo->update(['file_path' => $path]);

        return $todo;
    }
}
