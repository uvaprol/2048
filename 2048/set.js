function rd(max){
    return Math.floor(Math.random() * max);
}
function d_spin_field(field){
    let field_clone = [];
    field_clone.push([field[0][3], field[0][2], field[0][1], field[0][0]]);
    field_clone.push([field[1][3], field[1][2], field[1][1], field[1][0]]);
    field_clone.push([field[2][3], field[2][2], field[2][1], field[2][0]]);
    field_clone.push([field[3][3], field[3][2], field[3][1], field[3][0]]);
    return (field_clone);
}
function w_spin_field(field){
    let field_clone = [];
    field_clone.push([field[0][3], field[1][3], field[2][3], field[3][3]]);
    field_clone.push([field[0][2], field[1][2], field[2][2], field[3][2]]);
    field_clone.push([field[0][1], field[1][1], field[2][1], field[3][1]]);
    field_clone.push([field[0][0], field[1][0], field[2][0], field[3][0]]);
    return (field_clone);
}
function s_spin_field(field){
    let field_clone = [];
    field_clone.push([field[3][0], field[2][0], field[1][0], field[0][0]]);
    field_clone.push([field[3][1], field[2][1], field[1][1], field[0][1]]);
    field_clone.push([field[3][2], field[2][2], field[1][2], field[0][2]]);
    field_clone.push([field[3][3], field[2][3], field[1][3], field[0][3]]);
    return (field_clone);
}
function cels_generation(field){
    let count = 0;
    // field.forEach(y => {
    //     y.forEach(x => {
    //         if (x == 0 && count !=2){
    //             count++
    //         }
    //         else if (count == 2){
    //             break
    //         }
    //     });
    // });
    for(let y=0; y<4; y++){
        for(let x=0; x<4; x++){
            if (field[y][x] == 0 && count !=2){
                count++;
            }
            else if (count == 2){
                break;
            }
        }
    }
    while (true){
        for(let y=0; y<4; y++){
            for(let x=0; x<4; x++){
                if(field[y][x] == 0 && rd(100) >= 70){
                    count--;
                    if(rd(100) <= 90){
                        field[y][x] = 2;
                    }
                    else{
                        field[y][x] = 4;
                    }
                }
                if (count == 0){
                    return field;
                }
            }
        }
    }
}
function field_step(field){
    for(let y=0; y<4; y++){
        for(let x=0; x<3; x++){
            for(let z= x+1; z<4; z++){
                let i =0
                while (field[y][x] == 0 && i<4){
                    field[y].splice(x,1);
                    field[y].push(0)
                    i++
                }
                if(field[y][x] == field[y][z]){
                    field[y][x] += field[y][z];
                    field[y][z] = 0;
                    break;
                }
                else if(field[y][x] != field[y][z] && field[y][z] != 0){
                    break;
                }
            }
        }
        if (String(field[y]) != String([0, 0, 0, 0])){
            while (field[y][0] == 0){
                field[y].splice(x,1);
                field[y].push(0);
            }
        }
    }
    return(field);
}
function player_step(step, field){
    if (step == 'a'){
        field = field_step(field);
        field = cels_generation(field);
        return field;
    }
    else if(step == 'd'){
        field = d_spin_field(field);
        field = field_step(field);
        field = d_spin_field(field);
        field = cels_generation(field);
        return field;
    }
    else if(step == 'w'){
        field = w_spin_field(field);
        field = field_step(field);
        field = s_spin_field(field);
        field = cels_generation(field);
        return field;
    }
    else if(step == 's'){
        field = s_spin_field(field);
        field = field_step(field);
        field = w_spin_field(field);
        field = cels_generation(field);
        return field;
    }
}
function check_game_over(end_field, field, game_key){
    // end_key = true;
    // for(let y=0; y<4; y++){
    //     for(let x=0; x<4; x++){
    //         if(field[y][x] == 0){
    //             end_key = false;
    //             break;
    //         }
    //     }
    // }
    // if(String(field) == String(end_field) && end_key){
    //     alert('Вы проиграли');
    //     start_game()
    // }
    return (game_key);
}
function start_game(){
    let field = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    let end_field = Array.from(field);
    field = cels_generation(field);
    let game_key = true;
    render(field)
    game(end_field, game_key, field)
}
function render(field){
    console.log(field)
    let cell = document.getElementsByClassName('cell')
    const Tiles = {
        0:   ['',    '#cdc1b4', '#cdc1b4'],
        2:   ['2',   '#eee4da', '#776e65'],
        4:   ['4',   '#ede0c8', '#776e65'],
        8:   ['8',   '#f2b179', '#f9f6f2'],
        16:  ['16',  '#f59563', '#f9f6f2'],
        32:  ['32',  '#f67c5f', '#f9f6f2'],
        64:  ['64',  '#f65e3b', '#f9f6f2'],
        128: ['128', '#edcf72', '#f9f6f2'],
        256: ['256', '#edcc61', '#f9f6f2'],
        512: ['512', '#edc850', '#f9f6f2'],
    }
    field.forEach((y_line, y) => {
        y_line.forEach((tile_number, x) => {
            cell[y * 4 + x].innerHTML = '';
            cell[y * 4 + x].innerHTML += `${Tiles[tile_number][0]}`;
            cell[y * 4 + x].style.background = Tiles[tile_number][1];
            cell[y * 4 + x].style.color = Tiles[tile_number][2];
        });
    });
}

function game_body(end_field, game_key, field, step){
    if (game_key){
        game_key = check_game_over(end_field, field, game_key);
        end_field = Array.from(field);
        field = player_step(step, field);
        render(field)
        game(end_field, game_key, field)
    }
    else{
        start_game()
    }
}

// let start = start_game()
// end_field = start[0]
// field = start[1]
// game_key = start[2]
// console.log(field)
// render(field)
// game(end_field, game_key, field)
function game(end_field, game_key, field){
    document.addEventListener('keydown', keydown(end_field, field, game_key))
    function keydown(end_field, field, game_key) {
        document.onkeydown = function (e) {
            switch (e.key) {
                case 'ArrowUp':
                    step = 'w'
                    console.log(step)
                    game_body(end_field, game_key, field, step)
                    break;
                case 'ArrowDown':
                    step = 's'
                    console.log(step)
                    game_body(end_field, game_key, field, step)
                    break;
                case 'ArrowLeft':
                    step = 'a'
                    console.log(step)
                    game_body(end_field, game_key, field, step)
                    break;
                case 'ArrowRight':
                    step = 'd'
                    console.log(step)
                    game_body(end_field, game_key, field, step)
            }
        }
    };
}
start_game()
//function dev_mod(){
//    start_game()
//
//}
//dev_mod()
