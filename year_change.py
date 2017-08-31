#!usr/bin/env python
#encoding:utf-8
def year_change(a):
	if a>1912:
		b = a-1912+1
		print "中华民国%d年"%b
	else:
		print "你的year不符合要求"
	return ''
year = input("year is:")
print year_change(year)
