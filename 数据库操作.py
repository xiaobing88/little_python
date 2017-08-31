#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''Risk2S'''
#引用 模块包
import MySQLdb

db = MySQLdb.connect("localhost","root","root","test")
# 使用cursor()方法获取操作游标 
cursor = db.cursor()

sql = """SHOW DATABASES;"""

try:
    # 使用execute方法执行SQL语句
    cursor.execute(sql)
    db.commit()
    results = cursor.fetchall()
    print results
except:
    db.rollback()

# 关闭数据库连接
db.close()
