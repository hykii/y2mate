const y2mate = require("./y2mate");

(async () => {
    let api = new y2mate.y2mate();
    let ajax = await api.ajax("https://www.youtube.com/watch?v=jNQXAC9IVRw");
    console.log(ajax);
    let url = await api.convert(ajax["video_service"], ajax["k__id"], ajax["k_data_vid"], ajax["quality_keywords"][0]).toString();
    console.log(url);
})();
