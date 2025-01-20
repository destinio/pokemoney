<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Seen extends Model
{
  /** @use HasFactory<\Database\Factories\OwnedFactory> */
  use HasFactory;

  protected $table = 'seen';
  protected $primaryKey = 'id';
  public $incrementing = false;
  protected $keyType = 'string';

  protected $fillable = [
    'id',
    'name',
    'number',
    'cardId',
    'type',
    'image',
    'setId',
    'setName',
    'setImage',
    'setSeries',
    'rarity',
    'rawJson',
    'user_id',
  ];

  public function owned()
  {
    return $this->hasMany(Owned::class, 'seen_id', 'id');
  }

  public function price_data()
  {
    return $this->hasMany(CardPriceData::class, 'seen_id', 'seen_id');
  }
}
