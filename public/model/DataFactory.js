patApp.factory('DataFactory', function($rootScope){
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
            if(sessionStorage.length!=0){
                data.importedModels = angular.fromJson(sessionStorage.models);
            }
            return data.importedModels;
        },
        addModel: function(models){
            var array = [];
            
            for(var i = 0;i<models.length;i++){
                array[i]=(models[i]);
            }
            sessionStorage.models = angular.toJson(array);
        }
    };
    $rootScope.$on("addmodel",service.addModel);
    $rootScope.$on("getmodel",service.getModels);
});