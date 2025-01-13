<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CardPriceData extends Model
{
  /** @use HasFactory<\Database\Factories\CardPriceDataFactory> */
  use HasFactory;


  protected $fillable = [
    'low',
    'mid',
    'high',
    'market',
    'directLow',
    'seen_id',
  ];

  public $timestamps = true;
}
