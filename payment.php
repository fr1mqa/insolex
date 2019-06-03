<?php
    require '/var/www/vaterland/data/www/arbitrage/test/test1.lr-land.com/insolex/lib/autoload.php';
    use YandexCheckout\Client;

    $client = new Client();
    $client->setAuth('607074', 'live_efxSjy6BV2boktVfujQ_3WOVPes85dUiTcF4_BXoPWM');
    $descr = 'Бустеры insoleX '.$_POST['size'];
    $payment = $client->createPayment(
        array(
            'amount' => array(
                'value' => 3500.0,
                'currency' => 'RUB'
            ),
            'confirmation' => array(
                'type' => 'redirect',
                'return_url' => 'http://test1.lr-land.com/insolex/products.html',
            ),
            'capture' => true,
            'description' => $descr,
        ),
        uniqid('', true)
    );
    header('Location: '.$payment['confirmation']['confirmation_url']);
?>