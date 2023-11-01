<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'image',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
//     public function friends()
// {
//     return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id')
//         ->wherePivot('accepted', true); // Assurez-vous de filtrer les amis acceptés.
// }
public function friends()
{
    return $this->hasMany(Friend::class);
}
// public function friends()
// {
//     return $this->belongsToMany(User::class, 'friends', 'user_id', 'friend_id');
// }
public function addFriend(User $friend)
{
    // Créer une nouvelle entrée dans la table "friends" pour établir la relation d'amitié.
    return $this->friends()->attach($friend);
}
public function posts()
{
    return $this->hasMany(Post::class);
}
public function publicPosts()
{
    return $this->hasMany(Post::class)
        ->where('status', true); // Filtrez les articles publics
}

}
