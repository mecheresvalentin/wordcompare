function word_split(s) {
    if (s == "")
        return [];

    ws = s.split(" ");
    words = new Array();

    for (var i = 0; i < ws.length; i++) {
        tokens = ws[i].split("\n");

        if (tokens[0] != "")
            words.push(tokens[0]);

        for (var j = 1; j < tokens.length; j++) {
            words.push("\n");

            if (tokens[j] != "")
                words.push(tokens[j]);
        }
    }

    return words;
}

function diff_words(o, n) {
    try {
        o = o.normalize('NFC');
        n = n.normalize('NFC');
    } catch (err) {
    }

    var changes = diff(word_split(o), word_split(n));
    var str = "";

    for (var i = 0; i < changes.changes.length; i++) {
        var newline = (changes.text[i] == "\n");

        if (changes.changes[i] < 0) 
        {
            if (newline)
                str += "<del class='bg-danger'>&crarr;</del> ";
            else
                str += "<del class='bg-danger'>" + changes.text[i] + "</del> ";
        } else if (changes.changes[i] > 0)
        {
            if (newline)
                str += "<ins class='bg-success'>&crarr;</ins>\n";
            else
                str += "<ins class='bg-success'>" + changes.text[i] + "</ins> ";
        } else
        {
            str += changes.text[i];
            if (!newline)
                str += " ";
        }
    }

    return str.replace(/<\/del> <del>/g, " ").replace(/<\/ins> <ins>/g, " ");
}

function diff(o, n) {

    var map = new Array(o.length + 1);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(n.length + 1);
        map[i][0] = 0; 
    }
    for (var i = 0; i < map[0].length; i++) {
        map[0][i] = 0;  
    }

    o.unshift("");
    n.unshift("");

    for (var i = 1; i < map.length; i++) {
        for (var j = 1; j < map[i].length; j++) {
            if (o[i] == n[j])
                map[i][j] = map[i - 1][j - 1] + 1;

            else
                map[i][j] = Math.max(map[i][j - 1], map[i - 1][j]);
        }
    }

    var text = new Array();
    var changes = new Array();

    var i = map.length - 1;
    var j = map[0].length - 1;
    while (true) {
        if (i > 0 && j > 0 && o[i] == n[j]) {
            text.unshift(o[i]);
            changes.unshift(0);

            i--;
            j--;
        } else if (j > 0 && (i == 0 || map[i][j - 1] >= map[i - 1][j])) {
            text.unshift(n[j]);
            changes.unshift(1);

            j--;
        } else if (i > 0 && (j == 0 || map[i][j - 1] < map[i - 1][j])) {
            text.unshift(o[i]);
            changes.unshift(-1);

            i--;
        } else {
            break;
        }
    }

    return {
        text: text,
        changes: changes
    }
}

function compare()
{
    var RAz9QH3D3nzqCCQ = document.getElementById("RAz9QH3D3nzqCCQ").value;
    var VanasqWvd2PfKPh = document.getElementById("VanasqWvd2PfKPh").value;
    
    document.getElementById("diffs").innerHTML = diff_words(RAz9QH3D3nzqCCQ, VanasqWvd2PfKPh)
}