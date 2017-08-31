#!usr/bin/env python
#encoding:utf-8
year = input("year is:")
n = year%100
if n!=0:
	if (year%4)==0:
		print "此年为闰年"
	else:
		print "此年为平年"
if n==0:
	if (year%400)==0:
		print "此年为闰年"
	else:
		print "此年为平年"
