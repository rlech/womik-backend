Template.addEvent.events({
    'input #begin': function () {
        const _begin = $('#begin').val();
        const begin = moment(_begin, "DD.MM.YYYY HH:mm");
        Session.set("startsIn", moment(begin).fromNow());
        Session.set("begin", _begin);
    },
    'input #end': function () {
        const _end = $('#end').val();
        const end = moment(_end, "DD-MM-YYYY HH:mm");
        Session.set("end", _end);
        const begin = moment($('#begin').val(), "DD-MM-YYYY HH:mm");
        Session.set("duration", moment.duration(end.diff(begin, 'hours'), "hours").humanize());
    },
    'change #image_upload': function () {
        console.log("fired");
        //$('#image_upload').val("");
        FS.Utility.eachFile(event, function (file) {
            Images.insert(file, function (err, fileObj) {
                if (err) {
                    console.log("crazy err");
                    console.log(err);
                } else {
                    Session.set("image_id", fileObj._id);
                }
            });
        });
        console.log("fired2");
    },
    'input #article': function(){
      const string = $('#article').val();
        Session.set('article', string);
    },

    'input #notice': function(){
        const string = $('#notice').val();
        Session.set('notice', string);

    },

    'input #more_information': function(){
        const string = $('#more_information').val();
        Session.set('more_information', string);

    },
    'click .js-save': function () {

        const begin = $('#').val();
        const end = $('#').val();
        const title = $('#').val();
        const vendor = $('#').val();
        const type = $('#').val();
        const image_id = Session.get("image_id");
        const article = $('#').val();
        const fee = $('#').val();
        const age = $('#').val();
        const notice = $('#').val();
        const optional = $('#').val();
        const vendor_name = $('#').val();
        const vendor_street = $('#').val();
        const vendor_streetnr = $('#').val();
        const vendor_zipcode = $('#').val();
        const vendor_city = $('#').val();
        const more_information = $('#').val();
        const insider_name = $('#').val();
        const license = $('#').val();
        const author = $('#').val();
        const image_name = $('#').val();

        Meteor.call('addEvent',
            begin,
            end,
            title,
            vendor,
            type,
            image_id,
            article,
            fee,
            age,
            notice,
            optional,
            vendor_name,
            vendor_street,
            vendor_city,
            more_information,
            insider_name,
            license,
            author,
            image_name);
        FlowRouter.go('events');
    }
});

Template.addEvent.helpers({
    startsIn: function () {
        return "Startet in " + Session.get("startsIn");
    },
    duration: function () {
        return "Dauert ca. " + Session.get("duration");
    },
    image: function () {
        if (Session.get("image_id") != null) {
            return Images.findOne(Session.get("image_id"));
        }
    },
    article: function () {
        return Session.get("article");
    },
    notice: function () {
        return Session.get("notice");
    },
    more_information: function () {
        return Session.get("more_information");
    }
});


Template.addEvent.onCreated(function () {
    Session.keys = {};

    const instance = this;
    instance.subscribe('events');
    instance.subscribe('images');

});