const UrlData = require("../models/urlShortener.model");

const baseUrl = process.env.BASE_URL;

module.exports.getUrlData = async (req, res) => {
  try {
    const { alias } = req.params;
    let currentUser = req.user._id;

    if (!currentUser) {
      return res.status(401).json({ error: "User not logged in" });
    }
    console.log(`${baseUrl}/${alias}`);
    const getUrlData = await UrlData.findOne({
      shortUrl: `${baseUrl}/${alias}`,
    });

    if (!getUrlData) {
      return res.status(404).json({ error: "Given url not found" });
    }

    if (getUrlData.owner.toString() !== currentUser.toString()) {
      return res.status(401).json({ error: "You are not owner of this URL" });
    }

    res.status(200).json({
      totalClicks: getUrlData.totalClicks,
      uniqueUsers: getUrlData.uniqueUsers,
      clicksByDate: getUrlData.clicksByDate,
      osType: getUrlData.analytics.osType,
      deviceType: getUrlData.analytics.deviceType,
    });
  } catch (err) {
    console.log(`error in get url data controller`, err);
    res
      .status(500)
      .json({ error: "Internal server error.. something went wrong" });
  }
};

module.exports.getTopicUrlData = async (req, res) => {
  try {
    const { alias } = req.params;

    let user = req.user._id;

    let topicUrl = await UrlData.find({ category: alias, owner: user });

    if (topicUrl.length === 0) {
      res.status(200).json({ message: "No URL yet in this topic" });
    }

    let totalClicks = topicUrl.reduce(
      (acc, ele) => (acc = acc + ele.totalClicks),
      0
    );
    let uniqueClicks = topicUrl.reduce(
      (acc, ele) => (acc = acc + ele.uniqueUsers),
      0
    );
    let clicksByDate = topicUrl.map((ele) => ({
      shortUrl: ele.shortUrl,
      clicksByDate: ele.clicksByDate,
    }));
    let urls = topicUrl.map((ele) => ({
      shortUrl: ele.shortUrl,
      totalClicks: ele.totalClicks,
      uniqueUsers: ele.uniqueUsers,
    }));

    res.status(200).json({
      totalClicks,
      uniqueClicks,
      clicksByDate,
      urls,
    });
  } catch (err) {
    console.log(`error in get topic data controller`, err);
    res
      .status(500)
      .json({ error: "Internal server error.. something went wrong" });
  }
};

module.exports.getOverAllData = async (req, res) => {
  try {
    let currentUser = req.user._id;

    if (!currentUser) {
      res.status(404).json({ error: "User not found" });
    }
    let userUrl = await UrlData.find({ owner: currentUser });
    let totalClicks = userUrl.reduce((acc,ele)=> acc = acc + ele.totalClicks,0);
    let uniqueUsers = userUrl.reduce((acc,ele)=> acc = acc + ele.uniqueUsers,0);
    let clicksByDate = userUrl.map((ele) => ({
        shortUrl: ele.shortUrl,
        clicksByDate: ele.clicksByDate,
      }));
      let osType = userUrl.map((ele) => ({
        shortUrl: ele.shortUrl,
        osType: ele.analytics.osType ,
      }));
      let deviceType = userUrl.map((ele) => ({
        shortUrl: ele.shortUrl,
        deviceType: ele.analytics.deviceType ,
      }));

    res.status(200).json({ totalUrls: userUrl.length ,totalClicks,uniqueUsers,clicksByDate,osType,deviceType});
  } catch (err) {


    console.log(`error in get overall data controller`, err);
    res
      .status(500)
      .json({ error: "Internal server error.. something went wrong" });


  }
};
