#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''Risk2S'''
import requests
import re
import pymysql



name = "冈仁波齐/Paths of the Soul"
# 将数据传入数据库
def data_to_database(column_name,data):
    database = pymysql.connect("localhost", 'root', 'root', 'test', charset="utf8")
    # 使用 cursor() 方法创建一个游标对象 cursor
    cursor = database.cursor()
    # 使用 execute()  方法执行 SQL 查询
    sql = "INSERT INTO python_btbar_torrent(%s) VALUES('%s')" % (column_name,data)
    try:
        cursor.execute(sql)
        database.commit()
    except:
        database.rollback()
    print(sql)
    # 关闭数据库连接
    database.close()
# data_to_database('movie_name', name)

#首页推荐电影
def index(url):
    r = requests.get(url)
    # 网页源码
    html = r.content.decode('utf-8')
    # print(html)
    # 正则表达式
    pattern = re.compile(
        r'<tr><td>(.*)</td><td><img src=.+" alt="(.*)" title=".+><a.+" href="(.*)" title.+><b>(.*)</b>.+html">(.*)</a> <a.+html">(.*)</a></div></td><td>.+html">(.*)</a></td><td><i.*?>(.*)</i>.+</tr>')
    movie = re.findall(pattern, html)
    # print(movie)
    # print(len(movie))
    for i in range(0, len(movie)):
        print(movie[i])
    return movie
# url = 'http://www.btba.com.cn/'
# movie_names = index(url)
# for movie_name in movie_names:
#     print(movie_name[1])



#首页
def index_to_type(host_url):
    r = requests.get(host_url)
    html = r.content.decode('utf-8')
    pattern = re.compile(r'<li>(.*)</ul><div class="div index">')
    text = re.findall(pattern, html)
    # print(text[0])
    # print(type(text[0]))
    pattern_two = re.compile(r'<a href="(.*?)">(.*?)</a></li>')
    index_type_url = re.findall(pattern_two, text[0])
    # for i in range(0,len(index_type_url)):
    #     print(index_type_url[i])
    index_type_url = index_type_url[:-17:-1]
    # print(index_type_url)
    index_type_list = []
    for i in range(0, len(index_type_url)):
        # print("-----------------------------------------------")
        # print(index_type_url[i][0])
        index_type_url.append(index_type_url[i])
        # page_movies(index_type_url[i][0])
    return index_type_url

url_1 = 'http://www.btba.com.cn/type/美剧.html'
# 分类下的电影数据
def page_movies(url_type):
    # print(url_page)
    r = requests.get(url_type)
    # # 网页源码
    html = r.content.decode('utf-8')
    # print(html)
    pattern = re.compile(
        r'<li><a class="a".*<div>\s*<h3><a href="(.*)">(.*)</a><b>.+</h3>\s*<p>.+</p>\s*<p>.+</p>\s*<p>.+</p>\s*<p>.+</p>\s*</div></li>')
    movie = re.findall(pattern, html)
    type_movie_list = []
    for i in range(0, len(movie)):
        # print(movie[i])
        type_movie_list.append(movie[i])
        # page_torrent_list(movie[i][0])
    return type_movie_list
# page_movies(url_1)


# 获取单个电影的torrent页面
def page_torrent_list(url_movie):
    r = requests.get(url_movie)
    # 网页源码
    html = r.content.decode('utf-8')
    # print(html)
    pattern = re.compile(r'<h3><a href="(.*)" target="_blank"><i>(.*)</a></h3>')
    movie_torrent = re.findall(pattern, html)
    movie_torrent_list = []
    for i in range(0, len(movie_torrent)):
        movie_torrent_list.append(movie_torrent[i])
    return movie_torrent_list

# 单个电影的磁力链接
def torent_url_text(url_torrent):
    r = requests.get(url_torrent)
    # 网页源码
    html = r.content.decode('utf-8')
    # print(html)
    pattern = re.compile(r'<textarea id="status" readonly>(.*)</textarea>')
    torretn_text = re.findall(pattern, html)
    print(torretn_text)
# torent_url_text('http://www.btba.com.cn/down/417870714418/15.html')


###         main_main_main
host_url = 'http://www.btba.com.cn/'
#获取首页分类电影及其URL
index_type_url = index_to_type(host_url)
# print(index_type_url)
for item in index_type_url:
    type_url = item[0]
    # 获取分类下电影的URL和名字
    type_total_movie_list = []
    try:
        for i in range(1,99):
            type_movie_list = page_movies(index_type_url[6][0]+"?page={}".format(i))
            # print(index_type_url[6][0]+"?page={}".format(i))
            if i == 1:
                type_total_movie_list = type_total_movie_list + type_movie_list
                type_movie_list = []
                continue
            if type_movie_list[0] == type_total_movie_list[0]:
                break
            else:
                type_total_movie_list = type_total_movie_list + type_movie_list
                type_movie_list = []
            for j in type_total_movie_list:
                # type_total_movie_list = type_total_movie_list[0]
                # print(type_total_movie_list)
                # 获取电影torrent页面
                url_movie = j[0]
                movie_torrent_list = page_torrent_list(url_movie)
                for item in movie_torrent_list:
                    print(item)
                #磁力链接
                # for movie_torrent in movie_torrent_list:
                    # print(torent_url_text(movie_torrent[0]))
    except:
        continue
