# -*- coding: UTF-8 -*-

import os


def genDoc(path='/Users/wakary/GitHub/uni/myp-ui/mypUI'):
	# os.chdir(path)
	files = os.listdir(path)
	# print(files)
	for f in files:
		if os.path.isdir(path+'/'+f):
			# os.chdir(path+'/'+f)
			new_files = os.listdir(path+'/'+f)
			# print(new_files)
			for ff in new_files:
				if os.path.isfile(path+'/'+f+'/'+ff) and ff.endswith('.vue'):
					# print(ff)
					os.system('cd /Users/wakary/GitHub/uni/myp-ui')
					cmd = 'yarn vue-docgen mypUI/'+f+'/'+ff+' docsAuto'
					os.system(cmd)
	# cmd = 'cd /Users/wakary/GitHub/uni/myp-ui'
	# os.system(cmd)


if __name__ == '__main__':
	genDoc()
