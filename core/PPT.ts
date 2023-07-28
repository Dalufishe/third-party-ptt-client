import * as cheerio from "cheerio";

export type HotBoard = {
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardRate: number;
  boardLevel: number;
};

export type GroupBoard = {
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardHref: number;
};

class PPT {
  public static hotBoardsURL = "https://www.ptt.cc/bbs/hotboards.html";
  public static groupBoardsURL = "https://www.ptt.cc/cls";

  static async getHotBoards(): Promise<HotBoard[]> {
    const data = await fetch(this.hotBoardsURL);
    const html = await data.text();

    // analysize
    const $ = cheerio.load(html);
    const hotBoards: HotBoard[] = [];

    $(".b-ent").each(function () {
      hotBoards.push({
        boardClass: "",
        boardName: "",
        boardTitle: "",
        boardRate: 0,
        boardLevel: 0,
      });
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
      hotBoards[index].boardTitle = $(this).text().slice(1);
    });
    $(".board-nuser").each(function (index) {
      // 看版聲量
      hotBoards[index].boardRate = Number($(this).text());
      // 看版等級
      if ($(this).find(".f6").text()) {
        hotBoards[index].boardLevel = 1;
      } else if ($(this).find(".f4").text()) {
        hotBoards[index].boardLevel = 2;
      } else if ($(this).find(".f1").text()) {
        hotBoards[index].boardLevel = 3;
      } else if ($(this).find(".f3").text()) {
        hotBoards[index].boardLevel = 5;
      } else {
        hotBoards[index].boardLevel = 4;
      }
    });

    return hotBoards;
  }
  static async getGroupBoards(
    page?: number | string
  ): Promise<GroupBoard[]> {
    if (page === undefined) page = 1;
    const data = await fetch(this.groupBoardsURL + "/" + page);
    const html = await data.text();

    // analysize
    const $ = cheerio.load(html);
    const groupBoards: GroupBoard[] = [];

    $(".b-ent").each(function () {
      groupBoards.push({
        boardClass: "",
        boardName: "",
        boardTitle: "",
        boardHref: 0,
      });
    });

    $(".board-class").each(function (index) {
      // 看版分類
      groupBoards[index].boardClass = $(this).text();
    });
    $(".board-name").each(function (index) {
      // 看版名
      groupBoards[index].boardName = $(this).text();
    });
    $(".board-title").each(function (index) {
      // 看版標題
      groupBoards[index].boardTitle = $(this).text().slice(1);
    });
    $(".b-ent>.board").each(function (index) {
      groupBoards[index].boardHref = Number(
        $(this).attr("href")?.match(/\d+$/gu)
      );
    });

    return groupBoards;
  }
}

export default PPT;
