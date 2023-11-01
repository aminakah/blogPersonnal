<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{



    public function allPosts(){
        $userId = auth()->user()->id;
    
        $publicPosts = Post::select('posts.*', 'users.name as author_name', DB::raw('"public" as status_text'))
            ->leftJoin('users', 'posts.user_id', '=', 'users.id')
            ->where('posts.status', 'public') // Filtrez les publications publiques
            ->get();
        
        return response()->json($publicPosts);
    }
    // get all posts
    public function index()
    {
        $userId = auth()->user()->id;
        $posts = DB::table('posts')
            ->where('user_id', $userId)
            ->get();

        return response()->json($posts);
    }
    // get all posts
    public function postFriendPublic()
{
    $userId = auth()->user()->id;
    
    $publicPosts = Post::select('posts.*', 'users.name as author_name', DB::raw('"public" as status_text'))
        ->leftJoin('users', 'posts.user_id', '=', 'users.id')
        ->where('posts.status', 'public') // Filtrez les publications publiques
        ->get();
    
    return response()->json($publicPosts);
}

    public function postFriendPublics()
    {
        $userId = auth()->user()->id;
        $postsWithAuthors = Post::select('posts.*', 'users.name as author_name', DB::raw('CASE WHEN posts.status = 0 THEN "public" ELSE "privé" END as status_text'))
            ->leftJoin('users', 'posts.user_id', '=', 'users.id')
            ->where(function($query) use ($userId) {
                $query->where('posts.user_id', $userId) // Articles de l'utilisateur connecté
                    ->orWhere('posts.status', 'public'); // Articles publics
            })
            ->get();
        return response()->json($postsWithAuthors);
    }
   

    // get single post
    public function show($id)
    {
        // $userId = auth()->user()->id;

        $postsWithAuthors = Post::select('posts.*', 'users.name as author_name', DB::raw('CASE WHEN posts.status = 0 THEN "public" ELSE "privé" END as status_text'))
    ->leftJoin('users', 'posts.user_id', '=', 'users.id')
    ->where('posts.id', $id)->get();

    return response()->json($postsWithAuthors);
    }

    // create a post
    // public function store(Request $request)
    // {
    //     // Validez les données de la requête, vous pouvez utiliser la méthode validate() pour cela
    //     $validatedData = $request->validate([
    //         'postTitle' => 'required|string',
    //         'postBody' => 'required|string',
    //     ]);

    //     // Créez un nouvel article avec les données validées
    //     $post = new Post;
    //     $post->user_id = auth()->user()->id; // Affectez l'ID de l'utilisateur connecté
    //     $post->title = $validatedData['postTitle'];
    //     $post->body = $validatedData['postBody'];
    //     $post->status = $request->input('postPrivate');
    //     $post->save();

    //     return response()->json(['message' => 'Article ajouté avec succès'], 201);
    // }

    public function store(Request $request)
    {
        // Validez les données de la requête, vous pouvez utiliser la méthode validate() pour cela
        $validatedData = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
            'status' => 'required',
        ]);
        // Créez un nouvel article avec les données validées
        $post = new Post;
        $post->user_id = auth()->user()->id; // Affectez l'ID de l'utilisateur connecté
        $post->title = $validatedData['title'];
        $post->body = $validatedData['body'];
        $post->status =0;
        // $post->status = $request->input('postPrivate');
        $post->save();
        return response()->json(['message' => 'Article ajouté avec succès'], 201);
    }
  
    // update a post
    public function update(Request $request, $id)
    {
        // Validez les données de la requête, vous pouvez utiliser la méthode validate() pour cela
        $validatedData = $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);

        // Recherchez l'article que vous souhaitez mettre à jour
        $post = Post::findOrFail($id);

        // // Assurez-vous que l'utilisateur actuel est l'auteur de l'article
        // if (auth()->user()->id !== $post->user_id) {
        //     return response()->json(['message' => 'Vous n\'êtes pas autorisé à mettre à jour cet article'], 403);
        // }

        // Mettez à jour les propriétés de l'article avec les données validées
        $post->title = $validatedData['title'];
        $post->body = $validatedData['body'];
        // $post->status = $request->input('postPrivate');
        $post->save();

        return response()->json(['message' => 'Article mis à jour avec succès'], 200);
    }

    //delete post
    public function destroy($id)
    {
        $post = Post::find($id);

        if(!$post)
        {
            return response([
                'message' => 'Post not found.'
            ], 403);
        }
        $post->delete();

        return response([
            'message' => 'Post deleted.'
        ], 200);
    }
    public function rechercher(Request $request){
        try {

            $query = Post::query();
            $perPage = 2;
            $page = $request->input('page',1);
            $search = $request->input('search');
            if($search){
                $query->whereRaw("title LIKE '%" . $search . "%'");
            }
            $total = $query->count();
            $resultat = $query->offset(($page -1) * $perPage)->limit($perPage)->get();
            return response()->json([
                'status_code'=>200,
                'status_message'=>'les posts ont été récupérés',
                // 'data'=>Post::all()
                'current_page'=>$page,
                'last_page'=>ceil($total / $perPage),
                'item'=>$resultat
            ]);
        } catch (Exception $e) {
            return response()->json($e);
        }
    }
}
