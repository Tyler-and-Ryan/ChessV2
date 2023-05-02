/* params: array
 * returns: array with only unique elements
 */
const uniqueArray = (array) => {
    var a = array.concat();
    for(var i = 0; i < a.length; i++) {
        for(var j = i + 1; j < a.length; j++) {
            if(a[i].x === a[j].x && a[i].y === a[j].y)
                a.splice(j--, 1);
        }
    }
    return a;
}
//inspired by https://stackoverflow.com/questions/1584370/how-to-merge-two-arrays-in-javascript-and-de-duplicate-items

export { uniqueArray };