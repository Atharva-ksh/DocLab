===============================
Gingerit
===============================

.. image:: https://github.com/Azd325/gingerit/workflows/Python%20package/badge.svg

.. image:: https://img.shields.io/pypi/v/gingerit.svg
        :target: https://pypi.python.org/pypi/gingerit


Correcting spelling and grammar mistakes based on the context of complete sentences. Wrapper around the gingersoftware.com API

* Free software: MIT license
* Documentation: https://gingerit.readthedocs.org.

Installation:
-------------

::

    pip install gingerit

Usage:
------

::

    from gingerit.gingerit import GingerIt

    text = 'The smelt of fliwers bring back memories.'

    parser = GingerIt()
    parser.parse(text)

TODO:
-----

    - Commandline Tool


Thanks
------

Thank you for  `Ginger Proofreader <http://www.gingersoftware.com/>`_ for such awesome service. Hope they will keep it free :)

Thanks to @subosito for this inspriration `Gingerice <https://github.com/subosito/gingerice>`_
