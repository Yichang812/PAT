/**
 * Created by Yichang on 14/1/16.
 */


CodeMirror.defineSimpleMode("csp", {
    start: [
        {regex: /\/\/.*/, token: "comment"},
        {regex: /"(?:[^\\]|\\.)*?"/, token: "string"},

        //operator
        {regex:/(?:<R>|<G>|<F>|<FD>|<X>|<V>|<U>)/,token:"cspoperator"},
        {regex: /[#-+\/*=<>!|&?[\]]]/, token: "cspoperator"},

        //keyword
        {regex: /\b(?:import|include|assert|define|refines|alphabet|if|ifa|ifb|else|case|default|while|true|false|channel|var|hvar|init|call|tau|enum|interrupt|atomic|new)\b/,
            token: "keyword"},
        //csp process & channel method
        {regex: /Skip|Stop|cfull|cempty|ccount|csize|cpeek/, token: "atom"},
        //character
        {regex:/'[a-zA-Z0-9]'/,token:"variable-2"},
        //assertion
        {regex:/\bassert\s.*;\n/,token:"variable-2"},
        //punctuation
        {regex:/[+-\/%*^=~!|&#><[\]]|(\bxor\b)/,token:"meta"},
        {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,token: "number"},
        {regex: /[a-z$][\w$]*/, token: "variable"}
    ],
    meta: {
        dontIndentStates: ["comment"],
        lineComment: "//"
    }
});


