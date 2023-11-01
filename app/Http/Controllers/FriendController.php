<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Friend;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
class FriendController extends Controller
{
    public function getAmisArticles()
{
    $user = auth()->user();

    // Récupérez les amis de l'utilisateur
    $amis = $user->friends()->pluck('friend_id')->toArray();

    // Récupérez les articles publics de ses amis
    $articlesDesAmis = Post::whereIn('user_id', $amis)
        ->where('status', 0) // Filtrer les articles publics
        ->get();

    // Vous pouvez également inclure d'autres informations sur les amis si nécessaire


    $amisAvecArticles = User::whereIn('id', $amis)
    ->with(['posts' => function ($query) {
        $query->where('status', true);
    }])
    ->get();

    return response()->json([ $articlesDesAmis]);
}

public function addFriend(Request $request, $friendId)
{
    $user = auth()->user(); // Récupérez l'utilisateur authentifié qui souhaite ajouter un ami

    // Vérifiez que l'ami à ajouter existe (vous devez implémenter cette vérification)
    $friend = User::find($friendId);

    if (!$friend) {
        return response()->json(['message' => 'L\'ami que vous essayez d\'ajouter n\'existe pas.'], 404);
    }

    // Assurez-vous que l'utilisateur n'ajoute pas lui-même comme ami
    if ($user->id === $friend->id) {
        return response()->json(['message' => 'Vous ne pouvez pas vous ajouter vous-même comme ami.'], 400);
    }

    // Vérifiez si l'ami n'est pas déjà ajouté
    if ($user->friends()->where('friend_id', $friendId)->exists()) {
        return response()->json(['message' => 'Cet ami a déjà été ajouté.'], 400);
    }

    // Ajoutez l'ami
    $user->friends()->create([
        'friend_id' => $friendId,
    ]);

    return response()->json(['message' => 'Ami ajouté avec succès.'], 200);
}


  public function getFriendRequest(){
       $id = auth()->user()->id;
        $users = DB::table('users as u')
            ->join('friends as f', 'f.friend_id', '=', 'u.id')
            ->where('f.user_id', $id)
            ->where('f.accepted', false) // Add this line to filter by accepted friends
            ->select('u.*')
            ->get();
        return response()->json($users);
    }

  public function getFriend(){
       $id = auth()->user()->id;
        $users = DB::table('users as u')
            ->join('friends as f', 'f.friend_id', '=', 'u.id')
            ->where('f.user_id', $id)
            ->where('f.accepted', true) // Add this line to filter by accepted friends
            ->select('u.*')
            ->get();
        return response()->json($users);
    }

    public function listFriends(User $user)
    {
         $user = auth()->user();
        //  $friends = $user->friends;
         $friends = $user->friends->pluck('friend.name');
        if ($friends->isEmpty()) {
                    return response()->json(['message' => 'L\'utilisateur n\'a pas d\'amis.'], 404);
                }
         return response()->json(['friends' => $friends], 200);
    }



    public function showFriendArticles()
{
    // Récupérez l'ami en fonction de son ID
    $userId = auth()->user()->id;



    // Récupérez les articles publics de l'ami
    $posts = DB::table('posts as p')
        ->join('friends as f', 'p.user_id', '=', 'f.friend_id')
        ->where('f.user_id', $userId)
        ->select('p.*')
        ->get();

    return response()->json(['articles' => $posts], 200);
}


    public function updateAccepted(Request $request, $id)
        {
            $friend = Friend::find($id);

            if (!$friend) {
                return response()->json(['message' => 'Friend not found'], 404);
            }

            $accepted = $request->input('accepted');

            if ($accepted !== null) {
                $friend->accepted = $accepted;
                $friend->save();
                return response()->json(['message' => 'Accepté avec succès'], 200);
            } else {
                return response()->json(['message' => 'Erreur acceptation'], 400);
            }
        }



    public function delete($id)
    {
        $friend = Friend::find($id);

        if (!$friend) {
            return response()->json(['message' => 'Friend not found'], 404);
        }

        $friend->delete();

        return response()->json(['message' => 'Friend deleted'], 200);
    }



}
