<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoReorder extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:todos,id',
            'orders.*.order' => 'required|integer',
        ]);

        foreach ($request->orders as $todoOrder) {
            Todo::where('id', $todoOrder['id'])
                ->update(['order' => $todoOrder['order']]);
        }

        return response()->json(['status' => 'success']);
    }
}
