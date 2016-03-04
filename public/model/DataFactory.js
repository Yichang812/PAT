patApp.factory('DataFactory', function(){
    var data =
        {
            Assertions: [],
            Specification:"",
            importedModels:[{
                title: 'Model_1',
                cmModel:
                '//@@Dining Philosopher@@\n'+
                '////////////////The Model//////////////////\n'+
                '#define N 8;\n'+
                'Phil(i) = get.i.(i+1)%N -> get.i.i -> eat.i -> put.i.(i+1)%N -> put.i.i -> Phil(i);\n'+
                'Fork(x) = get.x.x -> put.x.x -> Fork(x) [] get.(x-1)%N.x -> put.(x-1)%N.x -> Fork(x);\n'+
                'College() = ||x:{0..N-1}@(Phil(x)||Fork(x));\n'+
                'Implementation() = College() \\ {get.0.0,get.0.1,put.0.0,put.0.1,eat.1,get.1.1,get.1.2,put.1.1,put.1.2,eat.2,get.2.2,get.2.3,put.2.2,put.2.3,eat.3,get.3.3,get.3.4,put.3.3,put.3.4,eat.4,get.4.4,get.4.5,put.4.4,put.4.5,eat.5,get.5.5,get.5.6,put.5.5,put.5.6,eat.6,get.6.6,get.6.7,put.6.6,put.6.7,eat.7,get.7.7,get.7.0,put.7.7,put.7.0};\n'+
                'Specification() = eat.0 -> Specification();\n',
                cmOption:{
                    lineNumbers: true,
                    indentWithTabs: true,
                    theme:'eclipse',
                    mode:'csp'}
            }]
        };
    
    return {
        getAssertions: function(){
            return data.Assertions;
        },
        setAssertions: function(assertions){
            for(var i=0;i<assertions.length;i++){
                data.Assertions[i] = assertions[i];
            }
        },
        clearAssertions: function(){
            data.Assertions = [];
        },
        getSpecification: function(){
            return data.Specification;
        },
        setSpecification: function(specification){
            data.Specification = specification;
        },
        clearSpecification: function(){
            data.Specification = "";
        },
        getModels: function(){
            return data.importedModels;
        },
        addModel: function(model){
            data.importedModels[data.importedModels.length] = model;
        }
    };
});
