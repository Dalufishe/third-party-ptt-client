import * as cheerio from "cheerio";
import serializeCookie from "../utils/serializeCookie";
import idGenerator from "../utils/idGenerator";

export type HotBoard = {
  id: string;
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardRate: number;
  boardLevel: number;
  boardHref: string;
};

export type GroupBoard = {
  id: string;
  boardClass: string;
  boardName: string;
  boardTitle: string;
  boardHref: string;
};

export type BoardItem = {
  id: string;
  title: string;
  href: string;
  author: string;
  date: string;
  rate: number;
  level: number;
};

export type Board = {
  need18up: boolean;
  data: BoardItem[];
  currentId: string;
  boardName: string;
};

export type Post = {
  page: string;
  need18up: boolean;
  title: string;
  author: string;
  time: number;
  board: string;
  article: string;
  images: string[];
  fromIp: string;
  fromCountry: string;
  edited: string;
  comments: {
    id: string;
    tag: string;
    user: string;
    content: string;
    time: string;
  }[];
};

class PTT {
  static hotBoardsURL = "https://www.ptt.cc/bbs/hotboards.html";
  static groupBoardsURL = "https://www.ptt.cc/cls";
  static boardURL = "https://www.ptt.cc/bbs";

  static async getHotBoards(): Promise<HotBoard[]> {
    const data = await fetch(this.hotBoardsURL);
    const html = await data.text();

    // analysize
    const $ = cheerio.load(html);
    const hotBoards: HotBoard[] = [];

    $(".b-ent").each(function () {
      idGenerator();
      hotBoards.push({
        id: idGenerator(),
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
        id: idGenerator(),
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
    name: string = "Gossiping",
    id: string = ""
  ): Promise<Board> {
    const url = `${this.boardURL}/${name}/index${id}.html`;
    let need18up = false;
    let currentId = "";

    // 請求第一次
    let data = await fetch(url, {});
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

    // get id
    $(".btn-group-paging>.btn").each(function (index) {
      if (index === 1) {
        const split = $(this).attr("href")?.split("/") || [];

        currentId = split[split?.length - 1].match(/\d+/gu)?.toString() || "";
      }
    });

    const board: BoardItem[] = [];

    // analysize
    $(".r-ent").each(function () {
      board.push({
        id: idGenerator(),
        title: "",
        href: "",
        author: "",
        date: "",
        rate: 0,
        level: 0,
      });
    });

    $(".title").each(function (index) {
      // title
      board[index].title = $(this).text();
      // href
      const aTag = $(this).find("a");
      if (aTag.text()) {
        const arr = aTag.attr("href")?.split("/");
        const data = arr?.[arr?.length - 2] + "/" + arr?.[arr?.length - 1];
        board[index].href = data?.match(/.+(?=\.html)/gu)?.toString() as string;
      }
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
      currentId,
      need18up,
      data: board,
      boardName: name,
    };
  }
  static async getPost(page: string): Promise<Post> {
    const url = `${this.boardURL}/${page}.html`;

    // 請求第一次
    let data = await fetch(url);
    let html = await data.text();
    let $ = cheerio.load(html);

    // analysize
    const post: Post = {
      page,
      need18up: false,
      title: "",
      author: "",
      time: 0,
      board: "",
      article: "",
      images: [],
      fromIp: "",
      fromCountry: "",
      edited: "",
      comments: [
        {
          id: idGenerator(),
          tag: "",
          user: "",
          content: "",
          time: "",
        },
      ],
    };

    // 若該版需滿 18
    if ($(".over18-notice").text()) {
      post.need18up = true;
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

    //* author, title, time
    $(".article-metaline").each(function (index) {
      // tool func
      const el = this;
      function getText() {
        return $(el).find(".article-meta-value").text();
      }

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
    });

    //* board
    post.board = $(".article-metaline-right>.article-meta-value").text();

    //* article
    let article = "";
    article = $("#main-content").text();
    article = article
      .split("--")
      .slice(0, article.split("--").length - 1)
      .join("--");
    article = article.split("\n").slice(1).join("\n");
    post.article = article;
    //* images
    $("#main-content .richcontent>img").each(function () {
      post.images.push($(this).attr("src") || "");
    });

    //* from, fromIp, edited
    const split = $("#main-content").html()?.split("--");
    const _$ = cheerio.load(split?.[split?.length - 1] || "");
    _$(".f2").each(function (index) {
      const data = $(this).text();
      switch (index) {
        case 0:
          post.fromIp = data.match(/\d+\.\d+\.\d+\.\d+/gu)?.toString() || "";
          let fc = data.match(/\([\u4E00-\u9FFF]+\)/gu)?.toString();
          fc = fc?.slice(1, fc.length - 1);
          post.fromCountry = fc || "";
          break;
        case 2:
          post.edited =
            data.match(/\d\d\/\d\d\/\d\d\d\d \d\d:\d\d:\d\d/gu)?.toString() ||
            "";
          break;
      }
    });

    //* comments
    $(".push").each(function (index) {
      const tag = $(this).find(".push-tag").text().trim();
      const user = $(this).find(".push-userid").text().trim();
      const content = $(this).find(".push-content").text().slice(2).trim();
      const time = $(this).find(".push-ipdatetime").text().trim();
      post.comments.push({
        id: idGenerator(),
        tag,
        user,
        content,
        time,
      });
    });
    post.comments = post.comments.slice(1);

    return post;
  }
  static imageReplacer(
    content: string,
    cb: (image: string, index: number) => any
  ) {
    const regexp =
      /https?:\/\/(?:[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]|%[a-fA-F0-9]{2})*\.(?:jpg|jpeg|png|gif|bmp|svg|webp)/gu;
    const matches = [...content.matchAll(regexp)];
    let replaced = content.split(regexp);
    console.log(replaced);
    let pos = 1;
    let index = 0;
    for (let match of matches) {
      const matchValue = match[0];
      replaced.splice(pos, 0, cb(matchValue, index));
      pos += 2;
      index += 1;
    }
    return replaced;
  }
}

export default PTT;
