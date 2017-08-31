#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''Risk2S'''
import corpus_data
import re
import random

#3常规的正则匹配
def fuzzfind(user_question,collection):
    suggestions = []
    pattern = '.*'.join(user_question)  # Converts 'djm' to 'd.*j.*m'
    # pattern = '.*'+pattern+'.*'
    # print(pattern)
    regex = re.compile(pattern)
    # print(regex)
    # print(collection)
    match =  regex.search(collection)
    if match:
        suggestions.append(collection)
        return suggestions

#2
def question_back_list(user_question):
    # 所有语料
    # print(corpus_data.text)
    app_answer = []
    for question in corpus_data.text:
        collection = question['question_main']
        collection = collection.lower()
        # print(collection)
        temporary_answer = fuzzfind(user_question,collection)
        # print(temporary_answer)
        if temporary_answer != []:
            # return temporary_answer
            app_answer.append(temporary_answer)
    # print(app_answer)
    return app_answer

#1
def find_answer(user_question):
    question_back_list_new = question_back_list(user_question)
    question_back_list_new = [str for str in question_back_list_new if str not in [None]]
    if question_back_list_new == []:
        return "对不起，我没检索到这个问题！"
    question_final = question_back_list_new[0]  #random.randint(0,len(question_back_list_new)-1)
    for ques in corpus_data.text:
        if str(ques['question_main']).lower() == question_final[0]:
            return ques['answer_only']


if __name__ == '__main__':
    while True:
        # user_question = "aiter"
        user_question = input("请输入问题：")
        # print("用户提问:"+user_question)
        user_question = user_question.replace(" ","")
        print("机器回答:",end='')
        print(find_answer(user_question))
        if user_question == "exit":
            break
