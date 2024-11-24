const POKEMON_PATH = `../assets/pokemons`;
class Pokemon {
  constructor(id, type, pokemonName, info) {
    this.id = id;
    this.pokemonName = pokemonName;
    this.type = type;
    this.info = info;
    this.imgPath = `${POKEMON_PATH}/${id}`;
  }
}

const TYPE_GRASS = "Grass";
const TYPE_WATER = "Water";
const TYPE_FIRE = "Fire";
const TYPE_GHOST = "Ghost";
const TYPE_ELECTRIC = "Electric";

const pokemonDataMap = new Map();
pokemonDataMap.set(
  "001",
  new Pokemon(
    "001",
    TYPE_GRASS,
    "Bulbasaur",
    "For some time after its birth, it uses the nutrients that are packed into the seed on its back in order to grow."
  )
);
pokemonDataMap.set(
  "002",
  new Pokemon(
    "002",
    TYPE_GRASS,
    "Ivysaur",
    "The more sunlight Ivysaur bathes in, the more strength wells up within it, allowing the bud on its back to grow larger."
  )
);
pokemonDataMap.set(
  "003",
  new Pokemon(
    "003",
    TYPE_GRASS,
    "Venusaur",
    "While it basks in the sun, it can convert the light into energy. As a result, it is more powerful in the summertime."
  )
);
pokemonDataMap.set(
  "004",
  new Pokemon(
    "004",
    TYPE_FIRE,
    "Charmander",
    "The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly."
  )
);
pokemonDataMap.set(
  "005",
  new Pokemon(
    "005",
    TYPE_FIRE,
    "Charmeleon",
    "When it swings its burning tail, the temperature around it rises higher and higher, tormenting its opponents."
  )
);
pokemonDataMap.set(
  "006",
  new Pokemon(
    "006",
    TYPE_FIRE,
    "Charizard",
    "If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade."
  )
);
pokemonDataMap.set(
  "007",
  new Pokemon(
    "007",
    TYPE_WATER,
    "Squirtle",
    "After birth, its back swells and hardens into a shell. It sprays a potent foam from its mouth."
  )
);
pokemonDataMap.set(
  "008",
  new Pokemon(
    "008",
    TYPE_WATER,
    "Wartortle",
    "Wartortle’s long, furry tail is a symbol of longevity, so this Pokémon is quite popular among older people."
  )
);
pokemonDataMap.set(
  "009",
  new Pokemon(
    "009",
    TYPE_WATER,
    "Blastoise",
    "It deliberately increases its body weight so it can withstand the recoil of the water jets it fires."
  )
);
pokemonDataMap.set(
  "025",
  new Pokemon(
    "025",
    TYPE_ELECTRIC,
    "Pikachu",
    "When it is angered, it immediately discharges the energy stored in the pouches in its cheeks."
  )
);
pokemonDataMap.set(
  "026",
  new Pokemon(
    "026",
    TYPE_ELECTRIC,
    "Raichu",
    "Its tail discharges electricity into the ground, protecting it from getting shocked."
  )
);
pokemonDataMap.set(
  "092",
  new Pokemon(
    "092",
    TYPE_GHOST,
    "Gastly",
    "It wraps its opponent in its gas-like body, slowly weakening its prey by poisoning it through the skin."
  )
);
pokemonDataMap.set(
  "093",
  new Pokemon(
    "093",
    TYPE_GHOST,
    "Haunter",
    "It likes to lurk in the dark and tap shoulders with a gaseous hand. Its touch causes endless shuddering."
  )
);
pokemonDataMap.set(
  "094",
  new Pokemon(
    "094",
    TYPE_GHOST,
    "Gengar",
    "To steal the life of its target, it slips into the prey’s shadow and silently waits for an opportunity."
  )
);
pokemonDataMap.set(
  "172",
  new Pokemon(
    "172",
    TYPE_ELECTRIC,
    "Pichu",
    "It is unskilled at storing electric power. Any kind of shock causes it to discharge energy spontaneously."
  )
);

export { pokemonDataMap };
/*
export const pokemonData = [
  new Pokemon(
    "001",
    TYPE_GRASS,
    "Bulbasaur",
    "For some time after its birth, it uses the nutrients that are packed into the seed on its back in order to grow."
  ),
  new Pokemon(
    "002",
    TYPE_GRASS,
    "Ivysaur",
    "The more sunlight Ivysaur bathes in, the more strength wells up within it, allowing the bud on its back to grow larger."
  ),
  new Pokemon(
    "003",
    TYPE_GRASS,
    "Venusaur",
    "While it basks in the sun, it can convert the light into energy. As a result, it is more powerful in the summertime."
  ),
  new Pokemon(
    "004",
    TYPE_FIRE,
    "Charmander",
    "The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly."
  ),
  new Pokemon(
    "005",
    TYPE_FIRE,
    "Charmeleon",
    "When it swings its burning tail, the temperature around it rises higher and higher, tormenting its opponents."
  ),
  new Pokemon(
    "006",
    TYPE_FIRE,
    "Charizard",
    "If Charizard becomes truly angered, the flame at the tip of its tail burns in a light blue shade."
  ),
  new Pokemon(
    "007",
    TYPE_WATER,
    "Squirtle",
    "After birth, its back swells and hardens into a shell. It sprays a potent foam from its mouth."
  ),
  new Pokemon(
    "008",
    TYPE_WATER,
    "Wartortle",
    "Wartortle’s long, furry tail is a symbol of longevity, so this Pokémon is quite popular among older people."
  ),
  new Pokemon(
    "009",
    TYPE_WATER,
    "Blastoise",
    "It deliberately increases its body weight so it can withstand the recoil of the water jets it fires."
  ),
  new Pokemon(
    "025",
    TYPE_ELECTRIC,
    "Pikachu",
    "When it is angered, it immediately discharges the energy stored in the pouches in its cheeks."
  ),
  new Pokemon(
    "026",
    TYPE_ELECTRIC,
    "Raichu",
    "Its tail discharges electricity into the ground, protecting it from getting shocked."
  ),
  new Pokemon(
    "092",
    TYPE_GHOST,
    "Gastly",
    "It wraps its opponent in its gas-like body, slowly weakening its prey by poisoning it through the skin."
  ),
  new Pokemon(
    "093",
    TYPE_GHOST,
    "Haunter",
    "It likes to lurk in the dark and tap shoulders with a gaseous hand. Its touch causes endless shuddering."
  ),
  new Pokemon(
    "094",
    TYPE_GHOST,
    "Gengar",
    "To steal the life of its target, it slips into the prey’s shadow and silently waits for an opportunity."
  ),
  new Pokemon(
    "172",
    TYPE_ELECTRIC,
    "Pichu",
    "It is unskilled at storing electric power. Any kind of shock causes it to discharge energy spontaneously."
  ),
];

*/
