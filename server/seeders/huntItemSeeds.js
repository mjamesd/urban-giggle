[
    {
        "name": "Space Needle",
        "city": "Seattle",
        "hint1": "It had the same designer as the nation's first shopping mall.",
        "hint2": "Built for the 1962 World's Fair",
        "hint3": "Iconic landmark in Lower Queen Anne",
        "solutionLocation": "Seattle Center",
        "solutionDescription": "The Space Needle"

    },
    {
        "name": "The Gum Wall",
        "city": "Seattle",
        "hint1": "A <em>sticky</em> situation.",
        "hint2": "Tourists add their own contributions, after chewing them.",
        "hint3": "Kinda gross attraction at Pike Place Market",
        "solutionLocation": "Pike Place Market",
        "solutionDescription": "The Gum Wall at Pike Place Market"
    },
    {
        "name": "Wayward Vegan Café",
        "city": "Seattle",
        "hint1": "Southern cooking for <strong>\"LOST\"</strong> vegans.",
        "hint2": "It's in the Ravenna neighborhood of Seattle.",
        "hint3": "Distant Worlds Coffee Shop is just down the street and had to change it's name to stop being confused with this establishment.",
        "solutionLocation": "801 NE 65th St Suite C, Seattle, WA 98115",
        "solutionDescription": "Congratulations! 🍗 Show this page to your server to get 10% off any appetizer!",
        "solutionImg": "http://www.waywardvegancafe.com/img/waywardlogofinal.png",
        "points": 4
    },
    {
        "name": "Vegan Pizza Pi",
        "city": "Seattle",
        "hint1": "You = hungry for vegan ⒫<em>i</em>z<sup>2</sup>α.",
        "hint2": "It's in the University District of Seattle.",
        "hint3": "Used to be two doors down from the old iconic Jet City Improv Theater.",
        "solutionLocation": "5301 Roosevelt Way NE, Seattle, WA 98105",
        "solutionDescription": "Far out! 🍕 Show this page to your server for 15% off any salad or dessert!",
        "solutionImg": "https://images.squarespace-cdn.com/content/v1/5a9a3e5eaa49a12b3dd005fe/1571176758171-OYT8HDIB2PMWVUOXTSTS/pivegan_logo_standard.png",
        "points": 2
    },
    {
        "name": "El Borracho (Ballard)",
        "city": "Seattle",
        "hint1": "This plant-based Mexican restaurant can make you the drunk, too.",
        "hint2": "Mexican food in the Swedish district??",
        "hint3": "You've walked right by it if you've been to the Ballard Sunday Market!",
        "solutionLocation": "5465 Leary Ave NW, Seattle, WA 98107",
        "solutionDescription": "Congratulations! 🎉 Show this page to your server to get a free vegan queso!",
        "solutionImg": "https://images.squarespace-cdn.com/content/v1/59b9e816e9bfdf9e756fbee3/b248096f-0ddd-49c0-be8e-7e452cc59522/ElBorracho+2.0-Logo-Final-02.png",
        "points": 4
    }
]


// const huntItemSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     qrId: {
//         type: String, // see .pre function below
//     },
//     hint1: {
//         type: String,
//         required: true,
//     },
//     hint2: {
//         type: String,
//         required: true,
//     },
//     hint3: {
//         type: String,
//         required: true,
//     },
//     solutionLocation: {
//         type: String, // description and/or lat&long
//         required: true,
//     },
//     solutionDescription: {
//         type: String,
//         required: true,
//     },
//     solutionImg: {
//         type: String,
//     },
//     points: {
//         type: Number,
//         required: true,
//         min: [1, "Must be a positive number"],
//     },
// });