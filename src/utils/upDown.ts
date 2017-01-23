export function upDown(v){
    let direction;
    switch(v){
        case "asc":
        case "1":
        case 1:
            direction = 1;
            break;
        case "desc":
        case "-1":
        case -1:
            direction = -1;
            break;
        default:
            direction = 1;
    }
    return direction;
}