<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SmsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CampagneController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\PermissionsController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Public routes
Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);



Route::group(['middleware'=>['auth:sanctum']],function(){

    Route::get('/check-authentication', function () {
        $user = auth()->user();
        if ($user) {
            return response()->json(['message' => 'User is authenticated', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'User is not authenticated'], 401);
        }
    });

    Route::post('/logout',[AuthController::class,'logout']);

    //Permissions
    Route::get('/permissions',[PermissionsController::class ,'index']);

    //User
    Route::get('/user',[UserController::class ,'index']);
    Route::get('/friend/{id}',[UserController::class ,'getFriend']);
    Route::post('/user/store',[UserController::class ,'store']);
    Route::get('/user/{id}', [UserController::class, 'show']);
    Route::put('/user/update/{id}', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
    Route::get("/rechercherUser",([UserController::class,'rechercherUser']));

    // Post
    Route::get('/allPosts', [PostController::class, 'allPosts']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/post', [PostController::class, 'store']);
    Route::get('/posts/{id}', [PostController::class, 'show']);
    Route::put('/posts/{id}', [PostController::class, 'update']);
    Route::delete('/post/{id}', [PostController::class, 'destroy']);
    Route::get('rechercher',[PostController::class,'rechercher']);
    Route::get('postFriend',[PostController::class,'postFriendPublic']);
    Route::get('postDeMesAmis',[PostController::class,'getAmisArticles']);

    // Comment
    Route::get('/posts/{id}/comments', [CommentController::class, 'index']);
    Route::post('/posts/{id}/comments', [CommentController::class, 'store']);
    Route::put('/comments/{id}', [CommentController::class, 'update']);
    Route::delete('/comments/{id}', [CommentController::class, 'destroy']);

    // Like
    Route::post('/posts/{id}/likes', [LikeController::class, 'likeOrUnlike']);


    //friend
    Route::post('/add-friend/{user}', [FriendController::class, 'sendFriend']);
    Route::post('/addFriend/{user}', [FriendController::class, 'addFriend']);
    Route::get('/get-friend', [FriendController::class, 'getFriend']);
    Route::get('/get-friend-request', [FriendController::class, 'getFriendRequest']);
    Route::post('/a/{id}', [FriendController::class, 'accep']);
    Route::get('/postFriend', [FriendController::class, 'showFriendArticles']);
    Route::put('/update-friend-accepted/{id}', [FriendController::class, 'updateAccepted']);
    Route::post('/decline-friend/{friend}', [FriendController::class, 'declineFriend']);
    Route::get('/friends', [FriendController::class, 'listFriends']);
    Route::get('postDeMesAmis',[FriendController::class,'getAmisArticles']);



});


