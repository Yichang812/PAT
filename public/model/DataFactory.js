patApp.factory('DataFactory', function(){
    var data =
        {
            Assertions: [],
            Specification:"",
            importedModels:[{
                title: 'Model_1',
                cmModel:
                '//Edit your model here',
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
