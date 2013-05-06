var counters = [ {
    "id" : 1,
    "name" : "numberOfApplications",
    "counter" : 6
}, {
    "id" : 2,
    "name" : "numberOfAdminUsers",
    "counter" : 1
}, {
    "id" : 3,
    "name" : "numberOfOrganizations",
    "counter" : 1
} ];

var appsProperties = [ {
    "id" : 4,
        "uuid" : "810c46ec-b188-11e2-b4f8-bc764e083eef",
        "name" : "deneme/anil",
        "userCount" : 1
}, {
    "id" : 51,
        "uuid" : "51b6ac5e-b18c-11e2-b4f8-bc764e083eef",
        "name" : "deneme/messagee",
        "userCount" : 2
} ];

var status = {
    "timestamp" : 1367763208281,
    "duration" : 5,
    "status" : {
        "started" : 1367759095824,
        "uptime" : 4112457,
        "version" : "0.1",
        "cassandraAvailable" : true,
        "com.usergrid.count.AbstractBatcher" : {
            "add_invocation" : {
                "type" : "timer",
                "unit" : "microseconds",
                "duration" : {
                    "min" : 5.686,
                    "max" : 17238.55,
                    "mean" : 33.49885021224985,
                    "std_dev" : 337.9578137226504,
                    "median" : 12.958,
                    "p75" : 21.26025,
                    "p95" : 33.1977,
                    "p98" : 41.10935999999995,
                    "p99" : 52.59442000000007,
                    "p999" : 4084.3973480000145
                },
                "rate" : {
                    "unit" : "seconds",
                    "count" : 6596,
                    "mean" : 1.6028775664048318,
                    "m1" : 4.104948975109857,
                    "m5" : 4.375492017022421,
                    "m15" : 2.7675477442672043
                }
            },
            "batch_add_invocations" : {
                "type" : "counter",
                "count" : 6596
            },
            "counter_existed" : {
                "type" : "counter",
                "count" : 5379
            }
        },
        "com.usergrid.count.CassandraSubmitter" : {
            "submit_invocation" : {
                "type" : "timer",
                "unit" : "microseconds",
                "duration" : {
                    "min" : 9687.2,
                    "max" : 37171.735,
                    "mean" : 21015.332,
                    "std_dev" : 10397.959867242229,
                    "median" : 18534.372,
                    "p75" : 30950.213499999998,
                    "p95" : 37171.735,
                    "p98" : 37171.735,
                    "p99" : 37171.735,
                    "p999" : 37171.735
                },
                "rate" : {
                    "unit" : "seconds",
                    "count" : 6,
                    "mean" : 0.0014580592254593225,
                    "m1" : 0.004224803698504494,
                    "m5" : 0.003836404974402432,
                    "m15" : 0.002492184889148506
                }
            }
        },
        "org.usergrid.rest.filters.MeteringFilter" : {
            "activeRequests" : {
                "type" : "counter",
                "count" : 1
            },
            "requests" : {
                "type" : "timer",
                "unit" : "milliseconds",
                "duration" : {
                    "min" : 0.745357,
                    "max" : 1562.623162,
                    "mean" : 85.04583107438016,
                    "std_dev" : 154.2066414722871,
                    "median" : 29.6751625,
                    "p75" : 124.5607535,
                    "p95" : 240.1365091499999,
                    "p98" : 339.5249542599984,
                    "p99" : 1053.457128549995,
                    "p999" : 1562.623162
                },
                "rate" : {
                    "unit" : "seconds",
                    "count" : 242,
                    "mean" : 0.05884729496696254,
                    "m1" : 0.07800160817524841,
                    "m5" : 0.08108182690628798,
                    "m15" : 0.06268936344260025
                }
            }
        }
    }
};

