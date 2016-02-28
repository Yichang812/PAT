patApp.factory('DataFactory', function(){
    var data =
        {
            Assertions: [],
            Specification:''
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
        getSpecification: function(){
            return data.Specification;
        },
        setSpecification: function(specification){
            data.Specification = specification;
        }
    };
});
