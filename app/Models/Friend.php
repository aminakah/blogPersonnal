<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend extends Model
{
    public $timestamps = false;
    use HasFactory;
    
    protected $fillable = ['user_id', 'friend_id', 'accepted'];

//     public function user()
//     {
//         return $this->belongsTo(User::class, 'user_id');
//     }

//     public function friend()
//     {
//         return $this->belongsTo(User::class, 'friend_id');
//     }
//     public static function friendRequestExists(User $user, User $friend)
// {
//     return self::where('user_id', $user->id)
//                ->where('friend_id', $friend->id)
//                ->where('accepted', false)
//                ->exists();
// }
public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}

public function friend()
{
    return $this->belongsTo(User::class, 'friend_id');
}
}
