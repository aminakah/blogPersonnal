<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    public function rechercherUser(Request $request){
        
        try {

            $query = User::query();
            $perPage = 4;
            $page = $request->input('page',1);
            $search = $request->input('search');
            if($search){
                $query->whereRaw("name LIKE '%" . $search . "%'");
            }
            $total = $query->count();
            $resultat = $query->offset(($page -1) * $perPage)->limit($perPage)->get();
    

            return response()->json([
                'status_code'=>200,
                'status_message'=>'les users ont été récupérés',
                'current_page'=>$page,
                'last_page'=>ceil($total / $perPage),
                'item'=>$resultat
            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new User;
        $user->name = $request->username;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->profil = $request->profil;
        $user->save();

        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->profil = $request->profil;

        if ($user->update()) {
            return response()->json($user);
        }
        
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function getFriend($id){
        $users = DB::table('users as u')
        ->join('friend as f', 'f.friend_id', '=', 'u.id')
        ->where('f.id', $id)
        ->select('u.*')
        ->get();
        return response()->json($users);
    }
}
