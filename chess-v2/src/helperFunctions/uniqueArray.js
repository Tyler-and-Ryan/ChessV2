/* params: array
 * returns: array with only unique elements. unique edges each have a unique destination 
 */
const uniqueArray = (array) => {
    var a = array.concat();
    // console.log("uniqueArray: a.length" + a.length);
    // console.log("uniqueArray a[0]: " + a[0]);
    for(var i = 0; i < a.length; i++) {
        for(var j = i + 1; j < a.length; j++) {
            // console.log("a[" + i + "].x, a[" + j + "].x: " + a[i].x + " === " + a[j].x);
            // console.log("a[" + i + "].y, a[" + j + "].y: " + a[i].y + " === " + a[j].y);
            if(a[i][1].x === a[j][1].x && a[i][1].y === a[j][1].y)
                // console.log("Before slice: a.length: " + a.length);
                a.splice(j--, 1);
                // console.log("After slice: a.length: " + a.length);
        }
    }

    return a;
}
//inspired by https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items

export { uniqueArray };