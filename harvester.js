if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to harvester. Project code is " + Session.get('projectname');;
  };

Template.hello.projects = function() {
        var iam = Meteor.call('whoAmI', function(error, results) {
            console.log(results.data);
            return results.data;
        });
};

  Template.hello.events({
    'click input': function () {
        var iam = Meteor.call('whoAmI', function(error, results) {
            console.log(results);
            Session.set('projectname',results.data[0].project.code);
        });
    }

  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

        
    Meteor.methods({
        whoAmI: function () {
            this.unblock();
            return Meteor.http.call("GET", "https://d2tstudio.harvestapp.com/projects", { 
                                    auth:     'derry@d2tstudio.com:password' ,
                                    headers: {  'Content-Type': 'application/json',
                                                'Accept': 'application/json' }
                            });
        }
    });// end methods



  });
}
