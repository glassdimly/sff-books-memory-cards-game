import alteredCarbon from "./altered-carbon.jpg";
import androids from "./do-androids-dream-of-electric-sheep.jpg";
import hyperion from "./hyperion.jpg";
import neuromancer from "./neuromancer.jpg";
import sparrow from "./sparrow.jpg";
import ancillary from "./ancillary-justice.jpg";
import dune from "./dune.jpg";
import ironDragon from "./iron-dragons-daughter.jpg";
import permutationCity from "./permutation-city.jpg";
import windupGirl from "./windup-girl.jpg";
import dawn from "./dawn.jpg";
import feed from "./feed.jpg";
import solaris from "./solaris.jpg";
import cardBack from "./card-back.jpg";

// @TODO generate file list on app build from directory listing if needed as dynamic.
const getBooks = () => [
  alteredCarbon,
  androids,
  hyperion,
  neuromancer,
  sparrow,
  ancillary,
  dune,
  ironDragon,
  permutationCity,
  windupGirl,
  dawn,
  feed,
  solaris
];

export { getBooks, cardBack };
