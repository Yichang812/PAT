/**
 * Created by Yichang on 14/1/16.
 */


CodeMirror.defineSimpleMode("csp", {
    start: [
        {regex: /\/\/.*/, token: "comment"},
        {regex: /\/\*/, token: "comment", next: "comment"},
        {regex: /"(?:[^\\]|\\.)*?"/, token: "string"},
        //character
        {regex:/'[a-zA-Z0-9]'/,token:"variable-2"},
        //assertion
        {regex:/(assert).+[;]/,token:"variable"},
        //punctuation
        {regex:/[+-\/%*^=~!|&#><[\]]|(\bxor\b)/,token:"meta"},
        {regex: /(?:import|include|assert|define|alphabet|if|ifa|ifb|else|case|default|while|true|false|channel|var|hvar|init|call|tau|enum|interrupt|atomic|new)\b/,
            token: "keyword"},
        //csp process & channel method
        {regex: /Skip|Stop|cfull|cempty|ccount|csize|cpeek/, token: "atom"},
        {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,token: "number"},
        {regex: /[#-+\/*=<>!|&?[\]]]|(\bR\b)|(\bG\b)|(\bF\b)|(\bFD\b)|(\bX\b)|(\bV\b)|(\bU\b)+/, token: "operator"},
        // indent and dedent properties guide autoindentation
        {regex: /[\{\[\(]/, indent: true},
        {regex: /[\}\]\)]/, dedent: true},
        {regex: /[a-z$][\w$]*/, token: "variable"}
    ],
    // The multi-line comment state.
    comment: [
        {regex: /.*?\*\//, token: "comment", next: "start"},
        {regex: /.*/, token: "comment"}
    ],
    // The meta property contains global information about the mode. It
    // can contain properties like lineComment, which are supported by
    // all modes, and also directives like dontIndentStates, which are
    // specific to simple modes.
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});


