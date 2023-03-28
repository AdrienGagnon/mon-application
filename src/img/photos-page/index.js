import img0 from './Pays-bas/amsterdam-canal.jpg';
import img1 from './France/paris-eiffel.jpg';
import img2 from './France/arc-triomphe-paris.jpg';
import img3 from './France/grenoble-vallee.jpg';
import img4 from './France/grenoble-avion.jpg';
import img5 from './France/chamechaude-grenoble.jpg';
import img6 from './France/grenoble-clairere.jpg';
import img7 from './France/ruisseau-grenoble.jpg';
import img8 from './France/lac-longet-grenoble.jpg';
import img9 from './France/annecy-lac.jpg';
import img10 from './France/chamonix-riviere.jpg';
import img11 from './Suisse/jet-eau-geneve.jpg';
import img12 from './Italie/vernazza.jpg';
import img13 from './Italie/vernazza-ruelle.jpg';
import img14 from './Italie/vernazza-sud.jpg';
import img15 from './Italie/Corniglia-maisons.jpg';
import img16 from './Italie/porte-mer-corniglia.jpg';
import img17 from './Italie/manarola.jpg';
import img18 from './Italie/tour-pise.jpg';
import img19 from './Italie/Florence-Santa-Maria-del-Fiore.jpg';
import img20 from './Italie/florence-riviere.jpg';
import img21 from './Italie/auberge-florence.jpg';
import img22 from './Italie/venise-canal.jpg';
import img23 from './Italie/tour-horloge-venise.jpg';
import img24 from './Italie/Tre-Cime-Di-Lavaredo-north.jpg';
import img25 from './Italie/paysage-sassolungo.jpg';
import img26 from './Italie/seceda-rochersV.jpg';
import img27 from './Allemagne/hotel-ville-munich.jpg';

const imageID = [
    {
        pays: 'Pays-Bas',
        ville: 'Amsterdam',
        description: 'Un magnifique canal en plein coeur de la capitale',
        imgName: 'amsterdam-canal',
        coords: [52.37185989346697, 4.895886074989968],
    },
    {
        pays: 'France',
        ville: 'Paris',
        description: 'La tour Eiffel',
        imgName: 'paris-eiffel.jpg',
        coords: [48.857263, 2.296041],
    },
    {
        pays: 'France',
        ville: 'Paris',
        description: "L'arc de triomphe",
        imgName: 'arc-triomphe-paris.jpg',
        coords: [48.873331882691176, 2.295983033755299],
    },
    {
        pays: 'France',
        ville: 'Grenoble',
        description: 'Les montagnes avoisinants Grenoble',
        imgName: 'grenoble-vallee.jpg',
        coords: [45.230433531166945, 5.752687031834701],
    },
    {
        pays: 'France',
        ville: 'Grenoble',
        description: 'La capitale des Alpes vu de haut',
        imgName: 'grenoble-avion.jpg',
        coords: [45.23464671173052, 5.762102368646841],
    },
    {
        pays: 'France',
        ville: 'Grenoble',
        description: 'Une vu de Chamechaude depuis Saint-Eynard',
        imgName: 'chamechaude-grenoble.jpg',
        coords: [45.23580055796551, 5.762375329108977],
    },
    {
        pays: 'France',
        ville: 'Grenoble',
        description: 'Une jolie clairière dans un sentier pédestre',
        imgName: 'grenoble-clairere.jpg',
        coords: [45.18029739025329, 5.659872667431663],
    },
    {
        pays: 'France',
        ville: 'Grenoble',
        description: 'Un ruisseau dans la chaîne de Belledonne',
        imgName: 'ruisseau-grenoble.jpg',
        coords: [45.14685389348281, 5.929052475623842],
    },
    {
        pays: 'France',
        ville: 'Grenoble',
        description: 'Le lac Longet dans la chaîne de Belledonne',
        imgName: 'lac-longet-grenoble.jpg',
        coords: [45.1524283041185, 5.935568181291888],
    },
    {
        pays: 'France',
        ville: 'Annecy',
        description: "Le lac d'Annecy bordant la ville du même nom",
        imgName: 'annecy-lac.jpg',
        coords: [45.89906569434637, 6.13246665750785],
    },
    {
        pays: 'France',
        ville: 'Chamonix',
        description:
            "L'Arveyron passant dans la station de villégiature provient de la mer de Glace",
        imgName: 'chamonix-riviere.jpg',
        coords: [45.924842893379825, 6.8708180671149615],
    },
    {
        pays: 'Suisse',
        ville: 'Genève',
        description: "Le jet d'eau de 140m dans le lac Léman",
        imgName: 'jet-eau-geneve.jpg',
        coords: [46.20895283699144, 6.151096520961646],
    },
    {
        pays: 'Italie',
        ville: 'Vernazza',
        description: 'Une petite ville colorée des Cinque Terre',
        imgName: 'vernazza.jpg',
        coords: [44.136459291401074, 9.682282990785017],
    },
    {
        pays: 'Italie',
        ville: 'Vernazza',
        description: 'Une ruelle étroite des Cinque Terre',
        imgName: 'vernazza-ruelle.jpg',
        coords: [44.135204, 9.683182],
    },
    {
        pays: 'Italie',
        ville: 'Vernazza',
        description: 'Vernazza vu du sud',
        imgName: 'vernazza-sud.jpg',
        coords: [44.13422, 9.684731],
    },
    {
        pays: 'Italie',
        ville: 'Corniglia',
        description: 'Les maisons colorées au bord de la mer Ligure',
        imgName: 'Corniglia-maisons.jpg',
        coords: [44.121088333127155, 9.70801465455592],
    },
    {
        pays: 'Italie',
        ville: 'Corniglia',
        description: 'Un tunnel menant à la plage',
        imgName: 'porte-mer-corniglia.jpg',
        coords: [44.11748934558981, 9.718562301450474],
    },
    {
        pays: 'Italie',
        ville: 'Manarola',
        description: 'La plus célèbre des Cinque Terre',
        imgName: 'manarola.jpg',
        coords: [44.10741142846114, 9.725854965170711],
    },
    {
        pays: 'Italie',
        ville: 'Pise',
        description: 'La célèbre tour penchée de Pise',
        imgName: 'tour-pise.jpg',
        coords: [43.72314581366591, 10.397107249930201],
    },
    {
        pays: 'Italie',
        ville: 'Florence',
        description: 'La cathédrale médiévale au coeur de la ville',
        imgName: 'Florence-Santa-Maria-del-Fiore.jpg',
        coords: [43.77271987812075, 11.255739566568433],
    },
    {
        pays: 'Italie',
        ville: 'Florence',
        description: 'La rivière Arno traversant Florence',
        imgName: 'florence-riviere.jpg',
        coords: [43.76929660393801, 11.25105013463713],
    },
    {
        pays: 'Italie',
        ville: 'Florence',
        description: 'Un bâtiment typique de Florence',
        imgName: 'auberge-florence.jpg',
        coords: [43.77268623610495, 11.245873487134457],
    },
    {
        pays: 'Italie',
        ville: 'Venise',
        description: 'Un canal traversant Venise',
        imgName: 'venise-canal.jpg',
        coords: [45.437444020255676, 12.348776695446187],
    },
    {
        pays: 'Italie',
        ville: 'Venise',
        description: "La tour de l'horloge de la place Saint-Marc",
        imgName: 'tour-horloge-venise.jpg',
        coords: [45.43427182913643, 12.338854928643196],
    },
    {
        pays: 'Italie',
        ville: 'Tre Cime di Lavaredo',
        description: 'Pics très célèbres des Dolomites',
        imgName: 'Tre-Cime-Di-Lavaredo-north.jpg',
        coords: [46.626688501402725, 12.312370438882837],
    },
    {
        pays: 'Italie',
        ville: 'Seceda',
        description: 'Situé dans les Alpes italliennes',
        imgName: 'paysage-sassolungo.jpg',
        coords: [46.59982292328854, 11.735825571003026],
    },
    {
        pays: 'Italie',
        ville: 'Seceda',
        description: 'Malga Pieralongia, dans la vallée de Seceda',
        imgName: 'seceda-rochersV.jpg',
        coords: [46.59804175787445, 11.748983542329343],
    },
    {
        pays: 'Allemagne',
        ville: 'Munich',
        description: 'Le nouvel hôtel de ville de Munich',
        imgName: 'hotel-ville-munich.jpg',
        coords: [48.137299313631615, 11.574946478971961],
    },
];

// Adding id to imageID array
function addID(images) {
    let id = 0;
    for (image of images) {
        image.id = id;
        id++;
    }
}

addID(imageID);

const photosArray = [
    img0,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
    img17,
    img18,
    img19,
    img20,
    img21,
    img22,
    img23,
    img24,
    img25,
    img26,
    img27,
];

export { imageID, photosArray };
