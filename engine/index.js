const { ChannelEngine } = require("./server")

class MyAssetManager {
  constructor() {
    this.assets = {
      art: [
        {
          id: 101,
          title: "bells",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/misc/transcoded/art/bells/master.m3u8",
        },
        {
          id: 102,
          title: "kid",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/misc/transcoded/art/kid/master.m3u8",
        },
        {
          id: 103,
          title: "public",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/misc/transcoded/art/public/master.m3u8",
        },
      ],
      nature: [
        {
          id: 201,
          title: "forest",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/misc/transcoded/nature/forest/master.m3u8",
        },
        {
          id: 202,
          title: "river",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/misc/transcoded/nature/river/master.m3u8",
        },
        {
          id: 203,
          title: "sea",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/misc/transcoded/nature/sea/master.m3u8",
        },
      ],
      cartoon: [
        {
          id: 301,
          title: "big bunny",
          uri: "https://d1hsxynlvbyrp1.cloudfront.net/videos/big_bunny/hls/index.m3u8"
        }
      ]
    };
  }

  async getNextVod(vodRequest) {
    const channelId = vodRequest.playlistId;

    const assets = this.assets[channelId];
    const idx = Math.floor(Math.random() * assets.length);

    const nextVod = assets[idx];

    console.log("channelId: " + channelId + ", nextVod: " + nextVod.title)
    return nextVod;
  }
}

class MyChannelManager {
  getChannels() {
    return [{ id: "art" }, { id: "nature" }, { id: "cartoon" }];
  }
}

const myAssetManager = new MyAssetManager();
const myChannelManager = new MyChannelManager();
const engine = new ChannelEngine(myAssetManager, {
  channelManager: myChannelManager,
});
engine.start2();
engine.listen(process.env.PORT || 8000);
