import gzip
import paddle.v2.dataset.flowers as flowers
import paddle.v2 as paddle
import reader
import vgg
import resnet
import alexnet
import googlenet

# PaddlePaddle init
paddle.init(use_gpu=False, trainer_count=1)

DATA_DIM = 3 * 224 * 224
CLASS_DIM = 102
BATCH_SIZE = 128

image = paddle.layer.data(
    name="image", type=paddle.data_type.dense_vector(DATA_DIM))
lbl = paddle.layer.data(
    name="label", type=paddle.data_type.integer_value(CLASS_DIM))

out = alexnet.alexnet(image, class_dim=CLASS_DIM)

out = vgg.vgg16(image, class_dim=CLASS_DIM)

out, out1, out2 = googlenet.googlenet(image, class_dim=CLASS_DIM)
loss1 = paddle.layer.cross_entropy_cost(
    input=out1, label=lbl, coeff=0.3)
paddle.evaluator.classification_error(input=out1, label=lbl)
loss2 = paddle.layer.cross_entropy_cost(
    input=out2, label=lbl, coeff=0.3)
paddle.evaluator.classification_error(input=out2, label=lbl)
extra_layers = [loss1, loss2]

out = resnet.resnet_imagenet(image, class_dim=CLASS_DIM)

cost = paddle.layer.classification_cost(input=out, label=lbl)

# Create parameters
parameters = paddle.parameters.create(cost)

# Create optimizer
optimizer = paddle.optimizer.Momentum(
    momentum=0.9,
    regularization=paddle.optimizer.L2Regularization(rate=0.0005 *
                                                     BATCH_SIZE),
    learning_rate=0.001 / BATCH_SIZE,
    learning_rate_decay_a=0.1,
    learning_rate_decay_b=128000 * 35,
    learning_rate_schedule="discexp", )

train_reader = paddle.batch(
    paddle.reader.shuffle(
        flowers.train(),
        buf_size=1000),
    batch_size=BATCH_SIZE)
test_reader = paddle.batch(
    flowers.valid(),
    batch_size=BATCH_SIZE)