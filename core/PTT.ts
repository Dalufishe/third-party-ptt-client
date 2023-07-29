import * as cheerio from "cheerio";
import serializeCookie from "../utils/serializeCookie";

export type HotBoard = {
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardRate: number;
  boardLevel: number;
  boardHref: string;
};

export type GroupBoard = {
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardHref: string;
};

export type BoardItem = {
  title: string;
  href: string;
  author: string;
  date: string;
  rate: number;
  level: number;
};

export type Post = {
  title: string;
  author: string;
  time: number;
  board: string;
  article: string;
  from: string;
  fromIp: string;
  edited: string;
  comments: {
    reaction: number;
    user: string;
    content: string;
    fromIp: string;
    time: string;
  }[];
};

class PTT {
  public static hotBoardsURL = "https://www.ptt.cc/bbs/hotboards.html";
  public static groupBoardsURL = "https://www.ptt.cc/cls";
  public static boardURL = "https://www.ptt.cc/bbs";

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
        boardHref: "",
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
      $(".b-ent>.board").each(function (index) {
        hotBoards[index].boardHref =
          $(this)
            .attr("href")
            ?.match(/(.+)(?=\/index\.html$)/gu)
            ?.toString()
            .slice(5) || "";
      });
    });

    return hotBoards;
  }
  static async getGroupBoards(page?: number | string): Promise<GroupBoard[]> {
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
        boardHref: "0",
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
      groupBoards[index].boardHref =
        $(this).attr("href")?.match(/\d+$/gu)?.toString() || "";
    });

    return groupBoards;
  }
  static async getBoard(
    name: string
  ): Promise<{ need18up: boolean; data: BoardItem[] }> {
    const url = this.boardURL + "/" + name + "/index.html";
    let need18up = false;

    // 請求第一次
    let data = await fetch(url);
    let html = await data.text();
    let $ = cheerio.load(html);

    // 若該版需滿 18
    if ($(".over18-notice").text()) {
      need18up = true;
      // 請求第二次
      const cookies = {
        over18: "1",
      };
      data = await fetch(url, {
        headers: {
          Cookie: serializeCookie(cookies),
        },
      });
      html = await data.text();
      $ = cheerio.load(html);
    }

    const board: BoardItem[] = [];

    // analysize
    $(".r-ent").each(function () {
      board.push({
        title: "",
        href: "",
        author: "",
        date: "",
        rate: 0,
        level: 0,
      });
    });

    $(".title").each(function (index) {
      board[index].title = $(this).text();
    });
    $(".title>a").each(function (index) {
      const arr = $(this).attr("href")?.split("/");
      const data = arr?.[arr?.length - 2] + "/" + arr?.[arr?.length - 1];
      board[index].href = data?.match(/.+(?=\.html)/gu)?.toString() as string;
    });
    $(".author").each(function (index) {
      board[index].author = $(this).text();
    });
    $(".date").each(function (index) {
      board[index].date = $(this).text();
    });
    $(".nrec").each(function (index) {
      // rate
      if ($(this).text() === "爆") {
        board[index].rate = -1;
      } else {
        board[index].rate = Number($(this).text());
      }
      // level
      if ($(this).find(".f1").text()) {
        board[index].level = 1;
      } else if ($(this).find(".f2").text()) {
        board[index].level = 2;
      } else if ($(this).find(".f3").text()) {
        board[index].level = 3;
      } else {
        board[index].level = 4;
      }
    });

    return {
      need18up,
      data: board,
    };
  }
  static async getPost(page: string): Promise<Post> {
    const data = await fetch(`${this.boardURL}/${page}.html`);
    const html = await data.text();

    // analysize
    const $ = cheerio.load(html);
    const post: Post = {
      title: "",
      author: "",
      time: 0,
      board: "",
      article: "",
      from: "",
      fromIp: "",
      edited: "",
      comments: [
        {
          reaction: 0,
          user: "",
          content: "",
          fromIp: "",
          time: "",
        },
      ],
    };

    $(".article-metaline").each(function (index) {
      // tool func
      const el = this;
      function getText() {
        return $(el).find(".article-meta-value").text();
      }

      //* board
      post.board = $(".article-metaline-right>.article-meta-value").text();

      //* author, title, time
      switch (index) {
        case 0:
          post.author = getText();
          break;
        case 1:
          post.title = getText();
          break;
        case 2:
          post.time = new Date(getText()).getTime();
      }

      //* article
      let article = "";
      article = $("#main-content").text();
      article = article.split("--")[0];
      article = article.split("\n").slice(2).join("\n");
      post.article = article;

      //* from, fromIp, edited
      $(".f2").each(function (index) {
        switch (index) {
          case 0:
            break;
        }
      });
    });

    return post;
  }
}

export default PTT;
