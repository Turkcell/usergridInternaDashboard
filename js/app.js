
function createModel(data) {
    var counters = data.counters;
    var appsProperties = data.appsProperties;
    var status = data.status;

    var m = {};

    m.appCount = function() {
        return _.findWhere(counters,  {name: "numberOfApplications"}).counter
    };

    m.adminCount = function() {
        return _.findWhere(counters,  {name: "numberOfAdminUsers"}).counter
    };

    m.orgCount = function() {
        return _.findWhere(counters,  {name: "numberOfOrganizations"}).counter
    };

    m.userNames = function() {
        return _.map(appsProperties, function(user) {return user.name});
    };

    m.startDateOfSystem = function() {
       return new Date(status.status.started);
    }

    m.uptime = function() {return status.status.uptime;} //TODO hangi unit?

    m.isCassandraAvailable = function() {
        return status.status.cassandraAvailable;
    };

    m.durationOfAbstractBatcherAddInvocation = function() {
        var duration = status.status['com.usergrid.count.AbstractBatcher'].add_invocation.duration;
        duration.unit = status.status['com.usergrid.count.AbstractBatcher'].add_invocation.unit;
        return duration;
    };

    m.rateOfAbstractBatcherAddInvocation = function() {
        return status.status['com.usergrid.count.AbstractBatcher'].add_invocation.rate;
    };

    m.invocationCountOfAbstractBatcherBatchAdd = function() {
        return status.status['com.usergrid.count.AbstractBatcher'].batch_add_invocations.count;
    }

    m.existingCounterOfAbstractBatcher = function() {
        return status.status['com.usergrid.count.AbstractBatcher'].counter_existed.count;
    }

    m.durationOfCassandraSubmitterInvocation = function() {
        var duration = status.status['com.usergrid.count.CassandraSubmitter'].submit_invocation.duration;
        duration.unit = status.status['com.usergrid.count.CassandraSubmitter'].submit_invocation.unit;
        return duration;
    }

    m.rateOfCassandraSubmitterInvocation = function() {
        return status.status['com.usergrid.count.CassandraSubmitter'].submit_invocation.rate;
    };

    m.countOfActiveRequests = function() {
        return status.status['org.usergrid.rest.filters.MeteringFilter'].activeRequests.count;
    };

    m.durationOfRequests = function() {
        var duration = status.status['org.usergrid.rest.filters.MeteringFilter'].requests.duration;
        duration.unit = status.status['org.usergrid.rest.filters.MeteringFilter'].requests.unit;
        return duration;
    }

    m.rateOfMeteringFilterRequest = function() {
        return status.status['org.usergrid.rest.filters.MeteringFilter'].requests.rate;
    }
    
    return m;
}

function applyToView(model) {
    $('#generalinfo #apps-count .count').text(model.appCount());
    $('#admin-count .count').text(model.adminCount());
    $('#org-count .count').text(model.orgCount());

    var userlist = $('#user-list ul');
    userlist.html('');
    _.each(model.userNames(), function(name) {
        var text = $('<span/>').text(name);
        $('<li/>')
            .append('<i class="icon-user" />')
            .append(text)
            .appendTo(userlist);
    });
    
    function formatDate(date) {
        function p(d) {return d < 10 ? "0" + d : d}

        return [p(date.getDate()), '.', p((date.getMonth() + 1)), '.', date.getFullYear(), ' ',
                p(date.getHours()), ':', p(date.getMinutes()), ':', p(date.getSeconds())].join('');
    }

    $('#startTime').text(formatDate(model.startDateOfSystem()));

    function trimDecimal(d) {
        return Math.round(d * 100) / 100;
    }

    var addInvocDuration = model.durationOfAbstractBatcherAddInvocation();
    $('#addInvocationMin .value').text(trimDecimal(addInvocDuration.min));
    $('#addInvocationMax .value').text(trimDecimal(addInvocDuration.max));
    $('#addInvocationMean .value').text(trimDecimal(addInvocDuration.mean));
    $('#addInvocationMedian .value').text(trimDecimal(addInvocDuration.median));
    var unitLabels = [
        '#addInvocationMin .unit', 
        '#addInvocationMax .unit', 
        '#addInvocationMean .unit', 
        '#addInvocationMedian .unit'].join(',');
    $(unitLabels).text(addInvocDuration.unit);

    var addInvocationRate = model.rateOfAbstractBatcherAddInvocation();
    $('#addInvocationCount').text(addInvocationRate.count);
    $('#addInvocationRate .value').text(trimDecimal(addInvocationRate.mean));
    $('#addInvocationRate .unit').text(addInvocationRate.unit);

    $('#batchAddInvocationCount').text(model.invocationCountOfAbstractBatcherBatchAdd());
    $('#counterExisted').text(model.existingCounterOfAbstractBatcher());

    var submitInvocationDuration = model.durationOfAbstractBatcherAddInvocation();
    $('#cassandraSubmitInvocationMin .value').text(trimDecimal(submitInvocationDuration.min));
    $('#cassandraSubmitInvocationMax .value').text(trimDecimal(submitInvocationDuration.max));
    $('#cassandraSubmitInvocationMean .value').text(trimDecimal(submitInvocationDuration.mean));
    $('#cassandraSubmitInvocationMedian .value').text(trimDecimal(submitInvocationDuration.median));
    var unitLabels = [
        '#cassandraSubmitInvocationMin .unit', 
        '#cassandraSubmitInvocationMax .unit', 
        '#cassandraSubmitInvocationMean .unit', 
        '#cassandraSubmitInvocationMedian .unit'].join(',');
    $(unitLabels).text(submitInvocationDuration.unit);

    var submitInvocationRate = model.rateOfCassandraSubmitterInvocation();
    $('#cassandraSubmitInvocationCount').text(submitInvocationRate.count);
    $('#cassandraSubmitInvocationRate .value').text(trimDecimal(submitInvocationRate.mean));
    $('#cassandraSubmitInvocationRate .unit').text(submitInvocationRate.unit);


    $('#meteringFilterActiveRequest').text(model.countOfActiveRequests());
    var requestDuration = model.durationOfRequests();
    $('#meteringRequestMin .value').text(trimDecimal(requestDuration.min));
    $('#meteringRequestMax .value').text(trimDecimal(requestDuration.max));
    $('#meteringRequestMean .value').text(trimDecimal(requestDuration.mean));
    $('#meteringRequestMedian .value').text(trimDecimal(requestDuration.median));
    var unitLabels = [
        '#meteringRequestMin .unit', 
        '#meteringRequestMax .unit', 
        '#meteringRequestMean .unit', 
        '#meteringRequestMedian .unit'].join(',');
    $(unitLabels).text(requestDuration.unit);

    var requestRate = model.rateOfMeteringFilterRequest();
    $('#meteringRequestCount').text(requestRate.count);
    $('#meteringRequestRate .value').text(trimDecimal(requestRate.mean));
    $('#meteringRequestRate .unit').text(requestRate.unit);
}


function requestData(dataUrlBase, callback) {
    if(!dataUrlBase)
        return null;

    if(dataUrlBase.charAt(dataUrlBase.length) != '/') 
        dataUrlBase = dataUrlBase + '/';

    var data = {
        counters: null, 
        appsProperties: null, 
        status: null
    };

    var statusUrl = dataUrlBase + 'status';
    var appsPropertiesUrl = dataUrlBase + 'dashboard/appsProperties';
    var countersUrl = dataUrlBase + 'dashboard/counters';
    

    $.getJSON(statusUrl)
        .fail(function() {
            error.log('Could not get status data from: ' + statusUrl);
        })
        .done(function(statusData) {
            data.status = statusData;

            $.getJSON(appsPropertiesUrl)
                .fail(function() {
                    error.log('Could not get appsProperties data from: ' + appsPropertiesUrl);
                })
                .done(function(appsPropertiesData) {
                    data.appsProperties = appsPropertiesData;


                    $.getJSON(countersUrl)
                        .fail(function() {
                            error.log('Could not get counters data from: ' + countersUrl);
                        })
                        .done(function(countersData) {
                            data.counters = countersData;

                            callback(data);
                        })
                })
        });
}

function updateUrl() {
    var urlBox = $('#settings-form :text');
    if(!urlBox.val()) {
        alert("Please fill base url value");
        return;
    }
    requestData(urlBox.val(), function(data) {
      var model = createModel(data); 
      applyToView(model);
    });
}
