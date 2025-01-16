const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlData = new Schema({
  longUrl: {
    type: String,
    required: true,
  },
  ipAdd:[
    {
        type: String,
        required: true
    }
  ],
  owner:{
     type: Schema.Types.ObjectId,
     required: true,
     ref: 'Users'
  },
  shortUrl: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
    enum:['others','business','personal','campaign']
  },
  totalClicks: {
    type: Number,
    default: 0
  },
  uniqueUsers: {
    type: Number,
    default: 0
  },
  clicksByDate: [
    {
      date: {
        type: Date,
      },
      count: {
        type: Number,
      },
    },
  ],
  analytics: {
    osType: [
      {
        osName: {
          type: String,
        },
        uniqueClicks: {
          type: Number,
        },
        uniqueUsers: {
          type: Number,
        },
      },
    ],
    deviceType: [{
        deviceName:{
            type: String
        },
        uniqueClicks:{
            type: Number
        },
        uniqueUsers:{
            type : Number
        }
    }],
    geoLocation:[
        {
            ip:{
                type: String,
            } ,
            hostname:{
                type: String
            },
            city:{
                type: String
            },
            region:{
                type: String
            },
            country:{
                type: String
            },postal:{
                type: String
            },
            location:{
                type: String
            }
         },

        ]
  },
},{timestamps: true});


module.exports = mongoose.model('UrlData',UrlData)