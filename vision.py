#python detect.py labels img/milk2.jpg
#python detect.py web-uri http://wheresgus.com/dog.JPG

# Set up: https://cloud.google.com/sdk/docs/
# pip install --upgrade google-cloud-vision
# gcloud auth application-default login

import argparse
import io
import sys
import base64

from google.cloud import vision
from google.cloud.vision import types

def detect_labels():
    """Detects labels in the file."""
    client = vision.ImageAnnotatorClient()

    # with io.open(path, 'rb') as image_file:
    #     content = image_file.read()

    try:
        raw = sys.stdin.readline()
        content = base64.b64decode(raw[24:])
    except Exception as e:
        print(e)

    image = types.Image(content=content)

    with open('img.png', 'wb') as f:
        f.write(content)


    try:
        response = client.label_detection(image=image)
    except Exception as e:
        print(e)

    labels = response.label_annotations

   
    db = ["potato chip", "red bull", "cookies", "cookies and crackers",  "apple", "water"];

    for label in labels:
        # print(label.score)

        if (label.description in db):
            print(label.description)





# [START def_detect_labels_uri]
def detect_labels_uri(uri):
    """Detects labels in the file located in Google Cloud Storage or on the
    Web."""
    client = vision.ImageAnnotatorClient()
    image = types.Image()
    image.source.image_uri = uri

    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')

    for label in labels:
        print(label.description)

# [END def_detect_labels_uri]

def run_local(args):
    if args.command == 'labels':
        detect_labels(args.uri)

def run_uri(args):
    if args.command == 'labels-uri':
        detect_labels_uri(args.uri)

if __name__ == '__main__':
    # parser = argparse.ArgumentParser(
    #     description=__doc__,
    #     formatter_class=argparse.RawDescriptionHelpFormatter)
    # subparsers = parser.add_subparsers(dest='command')

    # labels_file_parser = subparsers.add_parser(
    #     'labels-uri', help=detect_labels_uri.__doc__)
    # labels_file_parser = subparsers.add_parser(
    #     'labels', help=detect_labels.__doc__)
    # labels_file_parser.add_argument('uri')

    # args = parser.parse_args()

    # if ('uri' in args.command):
    #     run_uri(args)
    # else:
    #     run_local(args)

    detect_labels()
