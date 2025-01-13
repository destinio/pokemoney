<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Owned extends Model
{
  /** @use HasFactory<\Database\Factories\OwnedFactory> */
  use HasFactory;

  protected $table = 'owned';

  protected $fillable = [
    'name',
    'number',
    'cardId',
    'image',
    'setId',
    'setName',
    'setImage',
    'setSeries',
    'rarity',
    'rawJson',
    'user_id',
  ];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
}
