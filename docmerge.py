# -*- coding: UTF-8 -*-

import os
import json

BASE_URL = 'https://mypui.asnowsoft.cn/h5/#/'


# since my python is default python2
# python3 -u "/Users/wakary/GitHub/uni/myp-ui/docmerge.py"
# merge docsAuto with docsExtra for header.json in docs
def doc_merge():
    with open('./docs/header.json', 'r') as fp:
        files = json.load(fp)
        for f in files:
            # header
            header = files[f]
            print(header)
            content = '---\n'
            content += 'title: '+header['title']+'\n'
            content += 'type: '+header['type']+'\n'
            content += 'order: '+str(header['order'])+'\n'
            if 'page' in header:
                content += 'page: '+BASE_URL+header['page']+'\n'
            content += '---\n'
            # auto content
            auto_file = './docsAuto/mypUI/'+f+'/'+f+'.md'
            is_file = os.path.isfile(auto_file)
            if is_file:
                with open(auto_file, 'r') as r:
                    lines = r.readlines()
                    for line in lines:
                        if not line.startswith('# '+f):
                            content += line
            # extra content
            extra_file = './docsExtra/'+f+'.md'
            is_file = os.path.isfile(extra_file)
            if is_file:
                with open(extra_file, 'r') as e:
                    a = e.read()
                    content += a
            with open('./docs/'+f+'.md', 'w', encoding='utf8') as w:
                w.write(content)


if __name__ == '__main__':
    doc_merge()
