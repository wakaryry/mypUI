# -*- coding: UTF-8 -*-

import os
import json


def gen_header_json(path='/Users/wakary/GitHub/uni/myp-ui/mypUI'):
    headers = {}
    files = os.listdir(path)
    for f in files:
        if os.path.isdir(path+'/'+f):
            new_files = os.listdir(path+'/'+f)
            for ff in new_files:
                if os.path.isfile(path+'/'+f+'/'+ff) and ff.endswith('.vue'):
                    headers[f] = {
                        "type": "guide",
                        "title": "："+f,
                        "order": 1
                    }
    json_str = json.dumps(headers, indent=4, ensure_ascii=False)
    with open('docs/header_.json', 'w') as json_file:
        json_file.write(json_str)


if __name__ == '__main__':
    # 只是快速生成header.json 依然需要自己手动排序
    # 该文件只运行一次，以后手动添加数据，因为order是手动写的
    gen_header_json()
