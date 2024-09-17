---
template: blog-post
title: Vigenere Cipher
slug: /cryptologoy-vigenere-cipher
date: 2024-09-17 11:43
description: Cryptology, Crypto algorithm, Vigenere Cipher, Shiva Gyawali,
  Cyberus, Cybersecurity
---
In this article, we will deep dive into the cryptographic algorithm: Vigenere Cipher.

In the world of cryptography, the **Vigenère Cipher** holds a special place as one of the earliest known examples of a **polyalphabetic cipher**—a method designed to strengthen encryption and resist basic cryptanalytic attacks. Despite its simplicity, it introduced a new level of security that was far more robust than earlier ciphers, like the Caesar cipher. In this article, we'll explore the history, workings, and significance of the Vigenère Cipher.

In this:

* What is Vigenere Cipher
* How it works?
* Implementation using python

## What is Vigenere Cipher:

The **Vigenère Cipher** is a method of encrypting alphabetic text using a simple form of polyalphabetic substitution. Named after the French diplomat **Blaise de Vigenère**, the cipher encrypts each letter in a message using a corresponding letter in a key (a repeated sequence of characters) to determine how much to shift each letter.

The cipher was initially developed to overcome the weaknesses of the monoalphabetic ciphers, where each letter is substituted for a fixed corresponding letter. Instead of applying the same shift to every character in the message, the Vigenère Cipher varies the shift depending on a sequence of characters in a key, making it more resistant to attacks based on frequency analysis.

## How it works?

The Vigenère Cipher can be broken down into a few essential steps. Let’s walk through them to understand its operation:

#### Step 1: The Key

To encrypt a message, you need a **key**. The key is a sequence of letters, and its length can be shorter than the message. If the message is longer than the key, the key is repeated to match the length of the message.

For example:

* **Message:** `This is awesome blog`
* **Key:** `shiva`

Since the key is shorter than the message, it is repeated to match the message length:

* **Key (extended):** `shiv as hivashi vash`

The key is now ready for use in encryption.

#### Step 2: Encryption Process

The encryption process involves shifting each letter in the message based on the corresponding letter in the key. To determine the shift, you can visualize the cipher as a table, known as the **Vigenère Square** (or Vigenère Table). This table consists of 26 rows, each representing a Caesar cipher shift of the alphabet.

Here’s how the process works:

1. **Align the Message with the Key:** For every letter in the message, match a corresponding letter from the repeated key.

   Example:

   * **Message:** `This is awesome blog`
   * **Key:** `shiv as hivashi vash`
2. **Shift Each Letter:** Using the **Vigenère Table** or a simple mathematical formula, shift each letter of the message by the amount indicated by the corresponding key letter. The formula for this shift is:

   E(x)=(M+K)mod26

   Where:

   * E(x) is the encrypted letter,
   * M is the position of the message letter in the alphabet (A = 0, B = 1, ..., Z = 25),
   * K is the position of the key letter,
   * mod26 ensures the shifts remain within the bounds of the alphabet.

   **Example:**

   * Encrypting `T` (19th letter) using key `s` (18th letter):

     * Shift `T` by 11 positions → `L`
   * Encrypting `h` (7th letter) using key `h` (7th letter):

     * Shift `h` by 14 positions → `O`

   Repeating this for every letter in the message, we get the encrypted result.

#### Step 3: Decryption Process

To decrypt the message, the process is reversed:

1. Align the encrypted message with the key.
2. Subtract the corresponding key letter's shift value from each encrypted letter, and reverse the shift using the formula:

   D(x)=(E−K+26)mod26

   This restores the original message.

![](/assets/code-output.png)

- - -

### Example: Encryption and Decryption

Let’s use the following example to see the Vigenère Cipher in action.

**Message:** `Hello World`

**Key:** `key`

1. **Repeat the Key:**

   * Message: `Hello World`
   * Key: `key keykeyk`
2. **Encrypt:**

   * `H` (7) + `k` (10) = `R`
   * `e` (4) + `e` (4) = `i`
   * `l` (11) + `y` (24) = `j`
   * and so on...

   **Encrypted Message:** `Rijvs Uyvjn`
3. **Decrypt:** Using the reverse of the encryption process, we can get back the original message: **Decrypted Message:** `Hello World` 

- - -

## Implementation using python

Here is sample implementation of Vigenere cipher in python:

importing library:

```
# all library may not be used for Vigenere

import unicodedata, string, re, random, math
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
```

Encryption algorithm:

```
# printing vigenere table manually
def vig_table_manually():
    v = []
    for i in range (len(alpha)):
        v.append(cshift(alpha,i))
    return v


def vig_encrypt_mathematically(charset,s,key):
    "Encrypt the string 's' using Vigenère cipher and 'key' and table 'tbl'."
    '''
    STEPS:
    1. making equal length of key and s
    2. for every char in s, take corresponding char in key --> and then get the cross of these two characters
        store them in a ciphertext list
    3. print the ciphertext.
    '''
    # Add code to make s and key equal length
    
    #making all strings in uppercase
    s = s.upper()
    key = key.upper()
    
    # makging key of equal length as message
    j = 0 #index for key
    new_key = ''
    for char in s:
        if char.isalpha():
            new_key += key[j % len(key)]
            j += 1
        else:
            new_key += char
    # print(new_key)
    # print(s)
    mCipher = ''

    for pl, k in zip(s,new_key):
        if pl.isalpha() and k.isalpha():
            index_Si = charset.index(pl)
            index_Ki = charset.index(k)
            # print(index_Si, index_Ki)
            index_Ci = (index_Si + index_Ki) % len(alpha)
            # print(index_Ci)
            char_Ci = alpha[index_Ci]
            # print(char_Ci)
        else:
            char_Ci = pl
        mCipher += char_Ci
    # print(mCipher)
    return mCipher

# vig_encrypt_mathematically(alpha, "this is messae", "hello")
# this is sample output:
# HELL OH ELLOHE
# THIS IS MESSAE

# ALTD WZ QPDGHI



```



Decryption algorithm:

```
''' 
decrypting
'''
def decrypt_vigenere_mathematical(charset, key, cipher):
    #making all strings in uppercase
    cipher = cipher.upper()
    key = key.upper()
    
    # makging key of equal length as message
    j = 0 #index for key
    new_key = ''
    for char in cipher:
        if char.isalpha():
            new_key += key[j % len(key)]
            j += 1
        else:
            new_key += char
    mPlain = ''

    for cl, k in zip(cipher,new_key):
        if cl.isalpha() and k.isalpha():
            index_Ci = charset.index(cl)
            index_Ki = charset.index(k)
            # print(index_Si, index_Ki)
            index_Pi = (index_Ci - index_Ki) % len(charset)
            # print(index_Ci)
            char_Pi = charset[index_Pi]
            # print(char_Ci)
        else:
            char_Pi = cl
        mPlain += char_Pi
    # print(mPlain)
    return mPlain

# decrypt_vigenere_mathematical(alpha, "hello", "ALTD WZ QPDGHI")
# sample output: THIS IS MESSAE

```



Utilizing both and creating vigenere algorithm:

```
''' 
complete vigenere
'''
def vigenere_alg(charset,mode):

    key = ''
    plaintext = ''
    cipher = ''
    if mode == 'encrypt':
        key = input("Enter your key:")
        message = input("Enter your message to encrypt:")
        ciphertext = vig_encrypt_mathematically(charset, message, key)
        print(ciphertext)
    elif mode == 'decrypt':
        key = input("Enter your key:")
        cMessage = input("Enter your ciphertext to decrypt:")
        plaintext = decrypt_vigenere_mathematical(charset, key, cMessage)
        print(plaintext)

while True:
    m = int(input("What to you want to do?\n1. encrypt\n2. decrypt\n3. exit"))
    if m == 1:
        mode = 'encrypt'
    elif m == 2:
        mode = 'decrypt'
    elif m == 3:
        break
    else:
        print("Please enter valid choice, 1 or 2 only!!")
    alpha = string.ascii_uppercase
    vigenere_alg(alpha, mode)
    
        
```







- - -

### Strengths of the Vigenère Cipher

1. **Resistance to Frequency Analysis:** Traditional monoalphabetic ciphers can be easily cracked using frequency analysis, where the most common letters in the cipher text are matched to the most frequent letters in the language. Since the Vigenère Cipher uses multiple cipher alphabets, it confuses attackers by spreading out the frequencies of individual letters.
2. **Simple to Use:** While more secure than simpler ciphers like Caesar, the Vigenère Cipher is still easy to implement and requires no complex machinery.

- - -

### Weaknesses and Cryptanalysis

Despite its improvements over older ciphers, the Vigenère Cipher isn’t impervious to attack. It can be cracked using methods such as:

* **Kasiski Examination:** This is a cryptanalysis technique that identifies repeated sequences of letters in the cipher text, helping to determine the key length.
* **Frequency Analysis on Individual Shifts:** Once the key length is known, each shift can be analyzed separately, and frequency analysis can be applied to break each monoalphabetic shift.

- - -

### Conclusion

The Vigenère Cipher represented a significant leap forward in the history of cryptography by introducing polyalphabetic substitution. While it’s no longer considered secure for modern applications due to the advances in cryptanalysis, it played a crucial role in the evolution of encryption techniques. Its concepts are foundational, and understanding the Vigenère Cipher can offer valuable insights into more complex modern cryptographic systems.

In essence, the Vigenère Cipher remains a fascinating example of how simple ideas can provide stronger protection against prying eyes—even if only for a time.