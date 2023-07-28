import * as cheerio from "cheerio";

export type HotBoard = {
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardRate: number;
  boardLevel: number;
};

class PPT {
  public static hotBoardsURL = "https://www.ptt.cc/bbs/hotboards.html";
  public static groupBoardsURL = "https://www.ptt.cc/cls/1";

  static async getHotBoards(): Promise<HotBoard[]> {
    const data = await fetch(this.hotBoardsURL);
    const html = await data.text();

    // analysize
    const $ = cheerio.load(html);
    const hotBoards: HotBoard[] = [];

    $(".b-ent").each(function () {
      hotBoards.push({} as HotBoard);
    });

    $(".board-class").each(function (index) {
      // 看版分類
      hotBoards[index].boardClass = $(this).text();
    });
    $(".board-name").each(function (index) {
      // 看版名
      hotBoards[index].boardName = $(this).text();
    });
    $(".board-title").each(function (index) {
      // 看版標題
      hotBoards[index].boardTitle = $(this).text();
    });
    $(".board-nuser").each(function (index) {
      // 看版聲量
      hotBoards[index].boardRate = Number($(this).text());
      // 看版等級
      if ($(this).find(".f6").text()) {
        hotBoards[index].boardLevel = 1;
      } else if ($(this).find(".f1").text()) {
        hotBoards[index].boardLevel = 2;
      } else if ($(this).find(".f3").text()) {
        hotBoards[index].boardLevel = 4;
      } else {
        hotBoards[index].boardLevel = 3;
      }
    });

    return hotBoards;
  }
  static async getGroupBoards() {}
}

export default PPT;
